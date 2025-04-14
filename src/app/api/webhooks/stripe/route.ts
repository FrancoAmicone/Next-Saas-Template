import { NextResponse } from 'next/server'
import { headers } from 'next/headers'
import { getStripe } from '@/lib/stripe'
import { createServerSupabaseClient } from '@/lib/supabase'
import Stripe from 'stripe'

// Disable body parsing, we need the raw body for webhook verification
export const config = {
  runtime: 'edge',
  regions: ['iad1'],
}

async function getBodyBuffer(request: Request): Promise<Buffer> {
  const arrayBuffer = await request.arrayBuffer()
  return Buffer.from(arrayBuffer)
}

export async function POST(request: Request) {
  try {
    const body = await getBodyBuffer(request)
    const headersList = headers()
    const signature = headersList.get('stripe-signature')
    
    if (!signature) {
      return NextResponse.json(
        { error: 'Missing stripe-signature header' },
        { status: 400 }
      )
    }
    
    const webhookSecret = process.env.STRIPE_WEBHOOK_SECRET
    
    if (!webhookSecret) {
      return NextResponse.json(
        { error: 'Webhook secret is not configured' },
        { status: 500 }
      )
    }
    
    const stripe = getStripe()
    const event = stripe.webhooks.constructEvent(
      body,
      signature,
      webhookSecret
    )
    
    // Handle different event types
    switch (event.type) {
      case 'checkout.session.completed': {
        const session = event.data.object as Stripe.Checkout.Session
        const userId = session.metadata?.userId
        const subscriptionId = session.subscription as string
        
        if (userId && subscriptionId) {
          // Get subscription details from Stripe
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          const priceId = subscription.items.data[0].price.id
          
          // Update user profile with subscription info
          const supabase = createServerSupabaseClient()
          
          // First check if subscription already exists
          const { data: existingSubscription } = await supabase
            .from('subscriptions')
            .select('id')
            .eq('stripe_subscription_id', subscriptionId)
            .single()
          
          if (existingSubscription) {
            // Update existing subscription
            await supabase
              .from('subscriptions')
              .update({
                stripe_price_id: priceId,
                status: subscription.status,
                current_period_end: new Date((subscription.current_period_end as number) * 1000).toISOString(),
              })
              .eq('stripe_subscription_id', subscriptionId)
          } else {
            // Create new subscription
            await supabase
              .from('subscriptions')
              .insert({
                user_id: userId,
                stripe_subscription_id: subscriptionId,
                stripe_price_id: priceId,
                status: subscription.status,
                current_period_end: new Date((subscription.current_period_end as number) * 1000).toISOString(),
              })
          }
        }
        break
      }
      
      case 'invoice.payment_succeeded': {
        const invoice = event.data.object as Stripe.Invoice
        const subscriptionId = invoice.subscription as string
        
        if (subscriptionId) {
          const subscription = await stripe.subscriptions.retrieve(subscriptionId)
          
          // Update subscription in database
          const supabase = createServerSupabaseClient()
          await supabase
            .from('subscriptions')
            .update({
              status: subscription.status,
              current_period_end: new Date((subscription.current_period_end as number) * 1000).toISOString(),
            })
            .eq('stripe_subscription_id', subscriptionId)
        }
        break
      }
      
      case 'customer.subscription.updated': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Update subscription in database
        const supabase = createServerSupabaseClient()
        await supabase
          .from('subscriptions')
          .update({
            status: subscription.status,
            current_period_end: new Date((subscription.current_period_end as number) * 1000).toISOString(),
          })
          .eq('stripe_subscription_id', subscription.id)
        break
      }
      
      case 'customer.subscription.deleted': {
        const subscription = event.data.object as Stripe.Subscription
        
        // Update subscription status in database
        const supabase = createServerSupabaseClient()
        await supabase
          .from('subscriptions')
          .update({
            status: 'canceled',
          })
          .eq('stripe_subscription_id', subscription.id)
        break
      }
    }
    
    return NextResponse.json({ received: true })
  } catch (error) {
    console.error('Webhook error:', error)
    return NextResponse.json(
      { error: 'Webhook handler failed' },
      { status: 400 }
    )
  }
}

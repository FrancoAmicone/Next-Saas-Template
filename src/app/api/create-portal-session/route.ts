import { NextResponse } from 'next/server'
import { getStripe } from '@/lib/stripe'
import { createServerSupabaseClient } from '@/lib/supabase'

export async function GET(request: Request) {
  try {
    // Get the current user
    const supabase = createServerSupabaseClient()
    const { data: { session } } = await supabase.auth.getSession()
    
    if (!session?.user) {
      return NextResponse.json(
        { error: 'Unauthorized' },
        { status: 401 }
      )
    }
    
    // Get the user's subscription
    const { data: subscriptions } = await supabase
      .from('subscriptions')
      .select('stripe_subscription_id, stripe_customer_id')
      .eq('user_id', session.user.id)
      .single()
    
    if (!subscriptions?.stripe_customer_id) {
      return NextResponse.json(
        { error: 'No subscription found' },
        { status: 404 }
      )
    }
    
    // Create a Stripe customer portal session
    const stripe = getStripe()
    const appUrl = process.env.NEXT_PUBLIC_APP_URL
    
    if (!appUrl) {
      return NextResponse.json(
        { error: 'App URL is not configured' },
        { status: 500 }
      )
    }
    
    const portalSession = await stripe.billingPortal.sessions.create({
      customer: subscriptions.stripe_customer_id,
      return_url: `${appUrl}/dashboard`,
    })
    
    return NextResponse.redirect(portalSession.url)
  } catch (error) {
    console.error('Error creating portal session:', error)
    return NextResponse.json(
      { error: 'Internal server error' },
      { status: 500 }
    )
  }
}

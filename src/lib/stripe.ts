import Stripe from 'stripe'

// Initialize Stripe with the secret key
export const getStripe = () => {
  const secretKey = process.env.STRIPE_SECRET_KEY

  if (!secretKey) {
    throw new Error('Missing Stripe secret key')
  }

  return new Stripe(secretKey, {
    apiVersion: '2023-10-16', // Update this to the latest API version as needed
  })
}

// Initialize Stripe.js for the client side
export const getStripeJs = async () => {
  const publishableKey = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY
  
  if (!publishableKey) {
    throw new Error('Missing Stripe publishable key')
  }

  const { loadStripe } = await import('@stripe/stripe-js')
  return await loadStripe(publishableKey)
}

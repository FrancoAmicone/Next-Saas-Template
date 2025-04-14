'use client'

import { useState } from 'react'
import { useRouter } from 'next/navigation'
import { getSupabase } from '@/lib/supabase'

// Example pricing tiers - replace with your actual pricing
const pricingTiers = [
  {
    name: 'Hobby',
    description: 'All the basics for personal projects',
    price: '$9',
    interval: 'month',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
    ],
    priceId: 'price_hobby', // Replace with actual Stripe price ID
    highlighted: false,
  },
  {
    name: 'Pro',
    description: 'Perfect for small teams and growing businesses',
    price: '$29',
    interval: 'month',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
      'Feature 4',
      'Feature 5',
    ],
    priceId: 'price_pro', // Replace with actual Stripe price ID
    highlighted: true,
  },
  {
    name: 'Enterprise',
    description: 'Advanced features for large teams',
    price: '$99',
    interval: 'month',
    features: [
      'Feature 1',
      'Feature 2',
      'Feature 3',
      'Feature 4',
      'Feature 5',
      'Feature 6',
      'Feature 7',
    ],
    priceId: 'price_enterprise', // Replace with actual Stripe price ID
    highlighted: false,
  },
]

export default function PricingPage() {
  const [isLoading, setIsLoading] = useState<string | null>(null)
  const router = useRouter()
  
  const handleCheckout = async (priceId: string) => {
    setIsLoading(priceId)
    
    try {
      // Check if user is authenticated
      const supabase = getSupabase()
      const { data: { session } } = await supabase.auth.getSession()
      
      if (!session) {
        // Redirect to login if not authenticated
        router.push('/login?redirect=pricing')
        return
      }
      
      // Create checkout session
      const response = await fetch('/api/checkout', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ priceId }),
      })
      
      const data = await response.json()
      
      if (!response.ok) {
        throw new Error(data.error || 'Failed to create checkout session')
      }
      
      // Redirect to Stripe Checkout
      window.location.href = data.url
    } catch (error) {
      console.error('Error creating checkout session:', error)
    } finally {
      setIsLoading(null)
    }
  }
  
  return (
    <div className="bg-white py-24 sm:py-32">
      <div className="mx-auto max-w-7xl px-6 lg:px-8">
        <div className="mx-auto max-w-4xl text-center">
          <h1 className="text-base font-semibold leading-7 text-blue-600">Pricing</h1>
          <p className="mt-2 text-4xl font-bold tracking-tight text-gray-900 sm:text-5xl">
            Pricing plans for teams of all sizes
          </p>
          <p className="mt-6 text-lg leading-8 text-gray-600">
            Choose the perfect plan for your needs. Always know what you'll pay.
          </p>
        </div>
        
        <div className="isolate mx-auto mt-16 grid max-w-md grid-cols-1 gap-8 md:max-w-2xl md:grid-cols-2 lg:max-w-4xl lg:grid-cols-3">
          {pricingTiers.map((tier) => (
            <div
              key={tier.name}
              className={`rounded-3xl p-8 ring-1 ring-gray-200 ${
                tier.highlighted ? 'bg-gray-900 text-white ring-gray-900' : 'bg-white text-gray-900'
              }`}
            >
              <h2 className="text-lg font-semibold leading-8">{tier.name}</h2>
              <p className={`mt-4 text-sm leading-6 ${tier.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                {tier.description}
              </p>
              <p className="mt-6 flex items-baseline gap-x-1">
                <span className="text-4xl font-bold tracking-tight">{tier.price}</span>
                <span className={`text-sm font-semibold leading-6 ${tier.highlighted ? 'text-gray-300' : 'text-gray-600'}`}>
                  /{tier.interval}
                </span>
              </p>
              <ul
                className={`mt-8 space-y-3 text-sm leading-6 ${tier.highlighted ? 'text-gray-300' : 'text-gray-600'}`}
              >
                {tier.features.map((feature) => (
                  <li key={feature} className="flex gap-x-3">
                    <svg
                      className={`h-6 w-5 flex-none ${tier.highlighted ? 'text-white' : 'text-blue-600'}`}
                      viewBox="0 0 20 20"
                      fill="currentColor"
                      aria-hidden="true"
                    >
                      <path
                        fillRule="evenodd"
                        d="M16.704 4.153a.75.75 0 01.143 1.052l-8 10.5a.75.75 0 01-1.127.075l-4.5-4.5a.75.75 0 011.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 011.05-.143z"
                        clipRule="evenodd"
                      />
                    </svg>
                    {feature}
                  </li>
                ))}
              </ul>
              <button
                onClick={() => handleCheckout(tier.priceId)}
                disabled={isLoading === tier.priceId}
                className={`mt-8 block w-full rounded-md py-2.5 px-3.5 text-center text-sm font-semibold focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 ${
                  tier.highlighted
                    ? 'bg-white text-gray-900 hover:bg-gray-100 focus-visible:outline-white'
                    : 'bg-blue-600 text-white hover:bg-blue-500 focus-visible:outline-blue-600'
                }`}
              >
                {isLoading === tier.priceId ? 'Processing...' : 'Get started today'}
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

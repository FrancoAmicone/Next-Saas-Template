'use client';
import React from "react";

const STRIPE_KEY = process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || process.env.STRIPE_SECRET_KEY;

const demoPlans = [
  {
    name: "Starter",
    price: "$9/mo",
    description: "Perfect to try AI features and launch your first SaaS.",
    features: ["Basic AI features", "1 project", "Email support"],
    highlighted: false,
    cta: "Choose Plan"
  },
  {
    name: "Pro",
    price: "$29/mo",
    description: "For growing SaaS projects that need more power.",
    features: ["All Starter features", "Unlimited projects", "Priority support", "Advanced AI features"],
    highlighted: true,
    cta: "Choose Plan"
  },
  {
    name: "Enterprise",
    price: "Custom",
    description: "Custom AI solutions and dedicated support.",
    features: ["All Pro features", "Dedicated support", "Custom AI integrations"],
    highlighted: false,
    cta: "Contact Sales"
  }
];

export default function PricingPage() {
  const isDemo = !STRIPE_KEY;

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-white flex flex-col items-center justify-center px-4 py-12">
      <section className="max-w-2xl text-center mb-12">
        <h1 className="text-4xl sm:text-5xl font-bold mb-4">Pricing</h1>
        <p className="text-lg sm:text-xl text-gray-700 mb-6">
          Simple, transparent pricing. <span className="font-semibold text-blue-600">AI features included</span> in every plan.
        </p>
        {isDemo && (
          <div className="mb-4 inline-block rounded-full bg-yellow-100 px-4 py-1 text-sm font-semibold text-yellow-700">
            Demo mode: Connect your Stripe keys to enable real payments.
          </div>
        )}
      </section>
      <section className="max-w-4xl w-full mb-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {demoPlans.map((plan) => (
            <div
              key={plan.name}
              className={`bg-white rounded-lg shadow p-8 flex flex-col items-center border-2 ${plan.highlighted ? "border-blue-600 scale-105" : "border-transparent"} transition-transform`}
            >
              <h2 className="font-semibold text-2xl mb-2 text-blue-700">{plan.name}</h2>
              <p className="text-3xl font-bold mb-4">{plan.price}</p>
              <p className="mb-4 text-gray-600">{plan.description}</p>
              <ul className="mb-6 text-gray-700 text-sm space-y-1 text-left">
                {plan.features.map((f) => (
                  <li key={f}>✔️ {f}</li>
                ))}
              </ul>
              <button
                className={`w-full bg-blue-600 text-white px-6 py-2 rounded hover:bg-blue-700 font-semibold transition ${plan.highlighted ? "shadow-lg" : ""}`}
                disabled={isDemo}
                onClick={async () => {
                  if (isDemo) return;
                  const res = await fetch("/api/stripe/checkout-session", {
                    method: "POST",
                    headers: { "Content-Type": "application/json" },
                    body: JSON.stringify({ plan: plan.name }),
                  });
                  const data = await res.json();
                  if (data.url) {
                    window.location.href = data.url;
                  } else {
                    alert(data.error || "Could not start checkout session.");
                  }
                }}
              >
                {plan.cta}
              </button>
            </div>
          ))}
        </div>
      </section>
      {!isDemo && (
        <section className="max-w-xl w-full mt-8 text-center">
          <div className="text-green-700 font-semibold bg-green-100 rounded p-4">
            {/* Aquí irá la integración real de Stripe Checkout */}
            Stripe integration enabled. Ready for real payments.
          </div>
        </section>
      )}
    </div>
  );
}

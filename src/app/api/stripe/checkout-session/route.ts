import { NextRequest, NextResponse } from "next/server";
import Stripe from "stripe";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY || "", {
  apiVersion: "2023-10-16",
});

// Demo product/prices (replace with real ones per app)
const DEMO_PRICES = {
  Starter: "price_1NXXXXXstarterdemo", // Replace with your Stripe test price IDs
  Pro: "price_1NXXXXXprodemo",
  Enterprise: "price_1NXXXXXenterprisedemo",
};

export async function POST(req: NextRequest) {
  try {
    const { plan } = await req.json();
    const priceId = DEMO_PRICES[plan as keyof typeof DEMO_PRICES];
    if (!priceId) {
      return NextResponse.json({ error: "Invalid plan" }, { status: 400 });
    }
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      mode: "subscription",
      line_items: [
        {
          price: priceId,
          quantity: 1,
        },
      ],
      success_url: `${req.nextUrl.origin}/dashboard?success=true`,
      cancel_url: `${req.nextUrl.origin}/pricing?canceled=true`,
    });
    return NextResponse.json({ url: session.url });
  } catch (err: any) {
    return NextResponse.json({ error: err.message }, { status: 500 });
  }
}

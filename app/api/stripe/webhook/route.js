import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
const endpointSecret = process.env.STRIPE_WEBHOOK_SECRET;

export async function POST(req) {
  const body = await req.text();
  const signature = req.headers.get("stripe-signature");

  let event;

  try {
    event = stripe.webhooks.constructEvent(
      body,
      signature,
      endpointSecret
    );
  } catch (err) {
    return NextResponse.json(
      { error: err.message },
      { status: 400 }
    );
  }

  // ✅ Payment success
  if (event.type === "payment_intent.succeeded") {
    const intent = event.data.object;

    console.log("Payment success:", intent.id);
    console.log("Customer:", intent.metadata.name);
  }

  return NextResponse.json({ received: true });
}

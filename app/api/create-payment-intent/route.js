    import Stripe from "stripe";
    import { NextResponse } from "next/server";

    const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

    export async function POST(request) {
    //    return NextResponse.json({msg:'test hello'});
    try {
        const body = await request.json();
        const { amount } = body;

        const paymentIntent = await stripe.paymentIntents.create({
        amount: amount * 100,
        currency: "usd",
         metadata: {
      name: "Ali Khan",
      email: "ali@gmail.com",
    },
        });

        return NextResponse.json({
        clientSecret: paymentIntent.client_secret,
        });
    } catch (error) {
        return NextResponse.json(
        { error: error.message },
        { status: 500 }
        );
    }
    }
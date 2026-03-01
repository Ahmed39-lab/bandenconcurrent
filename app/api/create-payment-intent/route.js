import Stripe from "stripe";
import { NextResponse } from "next/server";

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);

export async function POST(request) {
  try {
    const body = await request.json();
    const { amount, billingInfo, cart } = body;

    // ================= 1. FIND / CREATE CUSTOMER =================
    const customerId = await findOrCreateCustomer(billingInfo);

    // ================= 2. CREATE ORDER =================
    let orderId = null;

    if (customerId) {
      orderId = await createOrder(customerId, amount);
      console.log("Order ID:", orderId);
    }

    // ================= 3. CREATE ORDER ITEMS =================
    if (orderId && cart?.length > 0) {
      await createOrderItems(orderId, cart);
    }

    // ================= 4. STRIPE PAYMENT INTENT =================
    const paymentIntent = await stripe.paymentIntents.create({
      amount: amount * 100,
      currency: "usd",
      metadata: {
        orderId,
        name: `${billingInfo.firstName} ${billingInfo.lastName}`,
        email: billingInfo.email,
        phone: billingInfo.phone,
        address: billingInfo.address,
        paymentMethod: billingInfo.paymentMethod,
      },
    });

    return NextResponse.json({
      clientSecret: paymentIntent.client_secret,
      orderId,
    });

  } catch (error) {
    console.error("Create Payment Error:", error);
    return NextResponse.json({ error: error.message }, { status: 500 });
  }
}

// ================= FIND OR CREATE CUSTOMER =================

async function findOrCreateCustomer(billingInfo) {
  const findCustomerRes = await fetch(
    `${process.env.STRAPI_API_URL}/customers?filters[email][$eq]=${billingInfo.email}`,
    {
      headers: {
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
    }
  );

const findCustomerData = await findCustomerRes.json();

if (Array.isArray(findCustomerData?.data) && findCustomerData.data.length > 0) {
  return findCustomerData.data[0].id;
}


  const createCustomerRes = await fetch(
    `${process.env.STRAPI_API_URL}/customers`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
      },
      body: JSON.stringify({
        data: {
          email: billingInfo.email,
          first_name: billingInfo.firstName,
          last_name: billingInfo.lastName,
          phone: billingInfo.phone,
          address: billingInfo.address,
        },
      }),
    }
  );

  const customer = await createCustomerRes.json();
  return customer.data[0].id;
}

// ================= CREATE ORDER =================

async function createOrder(customerId, totalAmount) {
  const orderRes = await fetch(`${process.env.STRAPI_API_URL}/orders`, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
      Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
    },
    body: JSON.stringify({
      data: {
        customer: customerId,
        total_amount: totalAmount,
        order_status: "pending",
      },
    }),
  });

  const orderData = await orderRes.json();
  return orderData.data.id;
}

// ================= CREATE ORDER ITEMS =================

async function createOrderItems(orderId, cart) {
  try {
    const requests = cart.map((item) => {
      return fetch(`${process.env.STRAPI_API_URL}/order-items`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.STRAPI_API_TOKEN}`,
        },
        body: JSON.stringify({
          data: {
            order: orderId,            // relation
            products: item.id,         // product id
            quantity: item.qty,   // qty
            price: item.price,         // price
          },
        }),
      });
    });

    await Promise.all(requests);
    console.log("All order items created successfully");

  } catch (error) {
    console.error("Order Items Error:", error);
    throw error;
  }
}
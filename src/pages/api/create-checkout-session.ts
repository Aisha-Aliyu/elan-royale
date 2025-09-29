import { NextApiRequest, NextApiResponse } from "next";
import Stripe from "stripe";
import { prisma } from "../../lib/prisma";
import { sendConfirmationEmail } from "../../lib/mailer"; // ✅ import mailer

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!);

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== "POST") {
    return res.status(405).end("Method Not Allowed");
  }

  try {
    const { reservationId, amount, email } = req.body; // ✅ make sure frontend sends "email"

    // Create Stripe checkout session
    console.log("Incoming request:", req.body);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ["card"],
      line_items: [
        {
          price_data: {
            currency: "jpy",
            product_data: {
              name: "Reservation Deposit",
            },
            unit_amount: amount, // in yen
          },
          quantity: 1,
        },
      ],
      mode: "payment",
      success_url: `${req.headers.origin}/confirmation?success=true&reservationId=${reservationId}`,
      cancel_url: `${req.headers.origin}/confirmation?canceled=true`,
    });

    console.log("Stripe session created:", session.url);

    // Save payment in database
    await prisma.payment.create({
      data: {
        reservationId,
        amount,
        status: "pending",
      },
    });

    // ✅ Send confirmation email
    if (email) {
      await sendConfirmationEmail(email, reservationId);
    }

    res.status(200).json({ url: session.url });
  } catch (err) {
    console.error(err);
    res.status(500).json({ error: "Payment creation failed" });
  }
}
import { NextResponse } from 'next/server';
import Razorpay from 'razorpay';

export async function POST(request: Request) {
  try {
    const { amount, donorName, donorEmail, donorPhone } = await request.json();
    const parsedAmount = Number(amount);

    if (!Number.isFinite(parsedAmount) || parsedAmount < 1) {
      return NextResponse.json({ message: 'Invalid donation amount.' }, { status: 400 });
    }

    const razorpayKeyId = process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID;
    const razorpayKeySecret = process.env.RAZORPAY_KEY_SECRET;

    if (!razorpayKeyId || !razorpayKeySecret) {
      return NextResponse.json(
        { message: 'Razorpay keys are missing. Add env values first.' },
        { status: 500 },
      );
    }

    const razorpay = new Razorpay({
      key_id: razorpayKeyId,
      key_secret: razorpayKeySecret,
    });

    const order = await razorpay.orders.create({
      amount: Math.round(parsedAmount * 100),
      currency: 'INR',
      receipt: `donation_${Date.now()}`,
      notes: {
        donorName: donorName ?? '',
        donorEmail: donorEmail ?? '',
        donorPhone: donorPhone ?? '',
      },
    });

    return NextResponse.json({
      orderId: order.id,
      amount: order.amount,
      currency: order.currency,
      key: razorpayKeyId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Unable to create order.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

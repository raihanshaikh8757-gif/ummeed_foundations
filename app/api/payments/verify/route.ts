import { NextResponse } from 'next/server';
import crypto from 'crypto';

export async function POST(request: Request) {
  try {
    const {
      razorpay_order_id: orderId,
      razorpay_payment_id: paymentId,
      razorpay_signature: signature,
    } = await request.json();

    if (!orderId || !paymentId || !signature) {
      return NextResponse.json({ message: 'Missing payment verification fields.' }, { status: 400 });
    }

    const secret = process.env.RAZORPAY_KEY_SECRET;
    if (!secret) {
      return NextResponse.json({ message: 'Missing Razorpay secret key.' }, { status: 500 });
    }

    const payload = `${orderId}|${paymentId}`;
    const expectedSignature = crypto.createHmac('sha256', secret).update(payload).digest('hex');

    if (expectedSignature !== signature) {
      return NextResponse.json({ message: 'Payment signature mismatch.' }, { status: 400 });
    }

    return NextResponse.json({
      success: true,
      message: 'Payment verified successfully.',
      paymentId,
      orderId,
    });
  } catch (error) {
    return NextResponse.json(
      {
        message: 'Unable to verify payment.',
        error: error instanceof Error ? error.message : 'Unknown error',
      },
      { status: 500 },
    );
  }
}

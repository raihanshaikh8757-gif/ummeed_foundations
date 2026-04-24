'use client';

import { FormEvent, Suspense, useMemo, useState } from 'react';
import Image from 'next/image';
import { useSearchParams } from 'next/navigation';

declare global {
  interface Window {
    Razorpay: new (options: RazorpayCheckoutOptions) => {
      open: () => void;
    };
  }
}

type RazorpayCheckoutResponse = {
  razorpay_order_id: string;
  razorpay_payment_id: string;
  razorpay_signature: string;
};

type RazorpayCheckoutOptions = {
  key: string;
  amount: number;
  currency: string;
  name: string;
  description: string;
  order_id: string;
  prefill: {
    name: string;
    email: string;
    contact: string;
  };
  theme: { color: string };
  method?: {
    upi?: boolean;
    card?: boolean;
    netbanking?: boolean;
    wallet?: boolean;
  };
  modal?: {
    ondismiss?: () => void;
    escape?: boolean;
  };
  handler: (response: RazorpayCheckoutResponse) => void;
};

const QUICK_AMOUNTS = [500, 1000, 2500, 5000];

function loadRazorpayScript() {
  return new Promise<boolean>((resolve) => {
    const existingScript = document.querySelector('script[data-razorpay="true"]');
    if (existingScript) {
      resolve(true);
      return;
    }

    const script = document.createElement('script');
    script.src = 'https://checkout.razorpay.com/v1/checkout.js';
    script.async = true;
    script.dataset.razorpay = 'true';
    script.onload = () => resolve(true);
    script.onerror = () => resolve(false);
    document.body.appendChild(script);
  });
}

function DonatePageContent() {
  const searchParams = useSearchParams();
  const amountFromQuery = Number(searchParams.get('amount'));
  const defaultAmount = Number.isFinite(amountFromQuery) && amountFromQuery > 0 ? amountFromQuery : 1000;
  const [selectedAmount, setSelectedAmount] = useState<number>(defaultAmount);
  const [customAmount, setCustomAmount] = useState<string>('');
  const [donorName, setDonorName] = useState('');
  const [donorEmail, setDonorEmail] = useState('');
  const [donorPhone, setDonorPhone] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [statusMessage, setStatusMessage] = useState('');
  const [paymentId, setPaymentId] = useState('');
  const [showUpiFallback, setShowUpiFallback] = useState(false);

  const finalAmount = useMemo(() => {
    const custom = Number(customAmount);
    if (customAmount && Number.isFinite(custom) && custom > 0) return custom;
    return selectedAmount;
  }, [customAmount, selectedAmount]);
  const upiId = 'ummeed.foundation@upi';
  const upiLink = `upi://pay?pa=${encodeURIComponent(upiId)}&pn=${encodeURIComponent(
    'Ummeed Foundation',
  )}&am=${encodeURIComponent(String(finalAmount))}&cu=INR&tn=${encodeURIComponent('NGO Donation')}`;

  const startPayment = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatusMessage('');
    setPaymentId('');
    setShowUpiFallback(false);

    if (finalAmount < 1) {
      setStatusMessage('Please enter a valid donation amount.');
      return;
    }

    setIsLoading(true);

    try {
      const scriptLoaded = await loadRazorpayScript();
      if (!scriptLoaded || !window.Razorpay) {
        throw new Error('Payment SDK failed to load. Please refresh and try again.');
      }

      const orderResponse = await fetch('/api/payments/create-order', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          amount: finalAmount,
          donorName,
          donorEmail,
          donorPhone,
        }),
      });

      const orderData = await orderResponse.json();
      if (!orderResponse.ok) {
        if (orderData?.message?.toLowerCase?.().includes('keys are missing')) {
          setShowUpiFallback(true);
          setStatusMessage(
            'Razorpay keys missing. Use UPI fallback button below or scan QR to complete payment.',
          );
          setIsLoading(false);
          return;
        }
        throw new Error(orderData.message || 'Failed to create payment order.');
      }

      const options: RazorpayCheckoutOptions = {
        key: orderData.key,
        amount: orderData.amount,
        currency: orderData.currency,
        name: 'Ummeed Foundation',
        description: `Donation of INR ${finalAmount}`,
        order_id: orderData.orderId,
        prefill: {
          name: donorName,
          email: donorEmail,
          contact: donorPhone,
        },
        method: {
          upi: true,
          card: true,
          netbanking: true,
          wallet: true,
        },
        modal: {
          escape: true,
          ondismiss: () => {
            setIsLoading(false);
            setStatusMessage('Payment window closed. You can try again.');
          },
        },
        theme: { color: '#E50914' },
        handler: async (response) => {
          try {
            const verifyResponse = await fetch('/api/payments/verify', {
              method: 'POST',
              headers: { 'Content-Type': 'application/json' },
              body: JSON.stringify(response),
            });
            const verifyData = await verifyResponse.json();
            if (!verifyResponse.ok || !verifyData.success) {
              throw new Error(verifyData.message || 'Payment verification failed.');
            }

            setPaymentId(response.razorpay_payment_id);
            setStatusMessage('Payment successful. Thank you for your donation!');
          } catch (error) {
            setStatusMessage(error instanceof Error ? error.message : 'Payment verification failed.');
          } finally {
            setIsLoading(false);
          }
        },
      };

      const razorpay = new window.Razorpay(options);
      setIsLoading(false);
      razorpay.open();
    } catch (error) {
      setStatusMessage(error instanceof Error ? error.message : 'Unable to process payment.');
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-background-main py-24 md:py-28 px-4 sm:px-6">
      <div className="max-w-6xl mx-auto grid grid-cols-1 lg:grid-cols-2 gap-6 md:gap-10">
        <section className="bg-background-section border border-white/10 p-6 md:p-10">
          <p className="text-accent-red text-xs font-bold uppercase tracking-[0.3em] mb-4">Donate Now</p>
          <h1 className="text-white text-3xl md:text-4xl font-extrabold tracking-tight mb-4">Complete Your Donation</h1>
          <p className="text-text-body text-sm mb-8">Pay securely via UPI, card, netbanking, or wallet in Razorpay checkout.</p>

          <form onSubmit={startPayment} className="space-y-5">
            <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
              {QUICK_AMOUNTS.map((amount) => (
                <button
                  key={amount}
                  type="button"
                  onClick={() => {
                    setSelectedAmount(amount);
                    setCustomAmount('');
                  }}
                  className={`py-3 text-sm font-bold border transition-colors ${
                    !customAmount && selectedAmount === amount
                      ? 'bg-accent-red border-accent-red text-white'
                      : 'border-white/20 text-white hover:border-accent-red'
                  }`}
                >
                  INR {amount}
                </button>
              ))}
            </div>

            <input
              type="number"
              min={1}
              placeholder="Custom amount (INR)"
              value={customAmount}
              onChange={(e) => setCustomAmount(e.target.value)}
              className="w-full bg-black/20 border border-white/20 px-4 py-3 text-white outline-none focus:border-accent-red"
            />

            <input
              type="text"
              required
              placeholder="Full Name"
              value={donorName}
              onChange={(e) => setDonorName(e.target.value)}
              className="w-full bg-black/20 border border-white/20 px-4 py-3 text-white outline-none focus:border-accent-red"
            />

            <input
              type="email"
              required
              placeholder="Email"
              value={donorEmail}
              onChange={(e) => setDonorEmail(e.target.value)}
              className="w-full bg-black/20 border border-white/20 px-4 py-3 text-white outline-none focus:border-accent-red"
            />

            <input
              type="tel"
              required
              placeholder="Phone Number"
              value={donorPhone}
              onChange={(e) => setDonorPhone(e.target.value)}
              className="w-full bg-black/20 border border-white/20 px-4 py-3 text-white outline-none focus:border-accent-red"
            />

            <div className="flex items-center justify-between text-xs uppercase tracking-wider text-text-body">
              <span>Amount</span>
              <span className="text-white font-bold">INR {finalAmount}</span>
            </div>

            <button
              type="submit"
              disabled={isLoading}
              className="w-full bg-accent-red hover:bg-accent-hover disabled:opacity-70 text-white py-4 text-xs font-bold uppercase tracking-[0.2em] transition-colors"
            >
              {isLoading ? 'Processing...' : 'Pay Securely'}
            </button>
          </form>

          <div className="mt-6 text-xs text-text-body">
            <p>Available payment modes inside checkout: UPI, debit/credit cards, netbanking, and wallets.</p>
          </div>

          {showUpiFallback && (
            <div className="mt-6 border border-accent-red/40 bg-accent-red/10 p-4">
              <p className="text-sm text-white mb-3">
                Instant fallback: complete payment directly via any UPI app.
              </p>
              <a
                href={upiLink}
                className="inline-block w-full text-center bg-accent-red hover:bg-accent-hover text-white py-3 text-xs font-bold uppercase tracking-[0.2em] transition-colors"
              >
                Pay via UPI App
              </a>
              <p className="mt-3 text-xs text-text-body">
                UPI ID: <span className="text-white font-semibold">{upiId}</span>
              </p>
            </div>
          )}

          {statusMessage && (
            <div className="mt-6 border border-white/20 p-4 text-sm text-white bg-black/20">
              <p>{statusMessage}</p>
              {paymentId && <p className="mt-2 text-xs text-text-body">Payment ID: {paymentId}</p>}
            </div>
          )}

          <div className="mt-4 text-xs text-text-body">
            <p>If payment does not open, configure Razorpay keys in `.env.local` and restart server.</p>
          </div>
        </section>

        <section className="bg-background-section border border-white/10 p-6 md:p-10">
          <h2 className="text-white text-2xl font-extrabold tracking-tight mb-2">Scan NGO QR (Demo)</h2>
          <p className="text-text-body text-sm mb-6">This is a placeholder QR for display. For real UPI QR, replace image in public folder.</p>

          <div className="bg-white p-4 w-fit mx-auto">
            <Image src="/ngo-qr-dummy.svg" alt="NGO donation QR code demo" width={280} height={280} />
          </div>

          <div className="mt-6 space-y-2 text-sm text-text-body">
            <p><span className="text-white font-semibold">UPI ID:</span> {upiId}</p>
            <p><span className="text-white font-semibold">Account Name:</span> Ummeed Foundation</p>
            <p><span className="text-white font-semibold">Note:</span> Replace with your verified NGO banking details.</p>
          </div>
        </section>
      </div>
    </div>
  );
}

export default function DonatePage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-background-main py-24 md:py-28 px-4 sm:px-6">
          <div className="max-w-6xl mx-auto">
            <p className="text-text-body text-sm">Loading donation page...</p>
          </div>
        </div>
      }
    >
      <DonatePageContent />
    </Suspense>
  );
}

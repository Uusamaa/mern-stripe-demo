import { useCallback } from 'react';

const useStripeCheckout = () => {
    const handleCheckout = useCallback(async (packageId: string) => {
        try {
            const response = await fetch('/api/stripe/create-checkout-session', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ packageId }),
            });

            const data = await response.json();
            if (data.url) {
                window.location.href = data.url; // Redirect to Stripe Checkout
            } else {
                alert('Error creating checkout session');
            }
        } catch (error) {
            console.error('Error:', error);
        }
    }, []);

    return { handleCheckout };
};

export default useStripeCheckout;

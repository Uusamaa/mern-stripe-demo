import { Request, Response as ExResponse } from 'express';
import { stripe } from '../config/stripeConfig';

export const createCheckoutSession = async (req: Request, res: ExResponse): Promise<void> => {
    try {
        const { packageId } = req.body;
        let price = 0;
        let description = '';

        switch (packageId) {
            case 'basic':
                price = 5000; // $50.00 in cents
                description = 'Basic Software Development Package';
                break;
            case 'standard':
                price = 10000; // $100.00 in cents
                description = 'Standard Software Development Package';
                break;
            case 'premium':
                price = 20000; // $200.00 in cents
                description = 'Premium Software Development Package';
                break;
            default:
                res.status(400).json({ error: 'Invalid package selection' });
                return;
        }

        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: { name: description },
                        unit_amount: price,
                    },
                    quantity: 1,
                },
            ],
            mode: 'payment',
            success_url: 'http://localhost:3000/success?session_id={CHECKOUT_SESSION_ID}',
            cancel_url: 'http://localhost:3000/cancel',
        });

        res.json({ url: session.url });
    } catch (error: any) {
        res.status(500).json({ error: error.message });
    }
};

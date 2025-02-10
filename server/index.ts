import express, { Request, Response as ExResponse } from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import Stripe from 'stripe';

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

// Initialize Stripe with your secret key from your Stripe Dashboard
const stripe = new Stripe(process.env.STRIPE_SECRET_KEY!, { apiVersion: '2025-01-27.acacia' });

app.post('/create-checkout-session', async (req: Request, res: ExResponse): Promise<void> => {
    try {
        // Expect the client to send a packageId (e.g., 'basic', 'standard', 'premium')
        const { packageId } = req.body;
        let price = 0;
        let description = '';

        // Define pricing logic based on the package selected
        switch (packageId) {
            case 'basic':
                price = 5000; // amount in cents ($50.00)
                description = 'Basic Software Development Package';
                break;
            case 'standard':
                price = 10000; // amount in cents ($100.00)
                description = 'Standard Software Development Package';
                break;
            case 'premium':
                price = 20000; // amount in cents ($200.00)
                description = 'Premium Software Development Package';
                break;
            default:
                res.status(400).json({ error: 'Invalid package selection' });
                return;
        }

        // Create a Stripe Checkout Session
        const session = await stripe.checkout.sessions.create({
            payment_method_types: ['card'],
            line_items: [
                {
                    price_data: {
                        currency: 'usd',
                        product_data: {
                            name: description,
                        },
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
});

const PORT = process.env.PORT || 4242;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));

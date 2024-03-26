import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from '../common/components/payment-form.jsx';
import { Button } from '@chakra-ui/react';
import { useState } from 'react';
import { useCart } from '../contexts/cart.context.jsx';
import axios from 'axios';

const stripePromise = loadStripe(import.meta.env.VITE_STRIPE_PUBLIC_KEY)

export const Checkout = () => {

    const [secret, setSecret] = useState('')
    const { cartItems } = useCart()

    const optionsAPI = {
        cartItems: cartItems.map((item) => { return { id: item.id, quantity: item.quantity } }
        ),
        currency: 'usd',
    };

    const optionsUI = {
        clientSecret: secret,
        appearance: {
            labels: 'floating',
        },
    }

    const createPayment = async () => {
        await axios.post('http://localhost:3000/orders/create-intent', optionsAPI).then(res => {
            setSecret(res.data.clientSecret)
        })
    }

    return (
        !secret ? (
            <Button onClick={() => createPayment()}>
                Checkout
            </Button>
        ) :(
            <Elements stripe={stripePromise} options={optionsUI}>
                < PaymentForm/>
            </Elements>
        )

    );
};

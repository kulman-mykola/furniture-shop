import { Elements } from '@stripe/react-stripe-js';
import { loadStripe } from '@stripe/stripe-js';
import { PaymentForm } from '../common/components/payment-form.jsx';

const stripePromise = loadStripe('pk_test_51OvcJmHv20A6zFX9whQNH2I56ebEg0VqGv3PKiS9cP8bW23UqoT1qY6LgoGKacVYjof6jQJtzkvhebF32shmwsbS00Sx6F4mq4')

export const Checkout = () => {

    const options = {
        mode: 'payment',
        amount: 1099,
        currency: 'usd',
        // Fully customizable with appearance API.
        appearance: {
            labels: 'floating',
        },
    };

    return (
        <Elements stripe={stripePromise} options={options}>
            <PaymentForm/>
        </Elements>
    );
};

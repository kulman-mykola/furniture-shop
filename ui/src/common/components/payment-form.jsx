import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';
import axios from 'axios';

export const PaymentForm = () => {

    const stripe = useStripe();
    const elements = useElements();

    const [errorMessage, setErrorMessage] = useState(null);

    const handleSubmit = async (event) => {
        event.preventDefault();

        if (elements == null) {
            return;
        }

        // Trigger form validation and wallet collection
        const {error: submitError} = await elements.submit();
        if (submitError) {
            // Show error to your customer
            setErrorMessage(submitError.message);
            return;
        }

        // Create the PaymentIntent and obtain clientSecret from your server endpoint
        const res = await axios('/create-intent', {
            method: 'POST',
        });

        const {client_secret: clientSecret} = await res.json();

        const {error} = await stripe.confirmPayment({
            //`Elements` instance that was used to create the Payment Element
            elements,
            clientSecret,
            confirmParams: {
                return_url: 'https://example.com/order/123/complete',
            },
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message);
        } else {
            // Your customer will be redirected to your `return_url`. For some payment
            // methods like iDEAL, your customer will be redirected to an intermediate
            // site first to authorize the payment, then redirected to the `return_url`.
        }
    };


    return (
        <form onSubmit={handleSubmit} style={{ width: 500, margin: 'auto' }}>
            <PaymentElement></PaymentElement>
            <Button type="submit" disabled={!stripe || !elements}>
                Pay
            </Button>
        </form>
    );
};

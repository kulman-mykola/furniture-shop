import { PaymentElement, useElements, useStripe } from '@stripe/react-stripe-js';
import { useState } from 'react';
import { Button } from '@chakra-ui/react';

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


        const { error } = await stripe.confirmPayment({
            elements,
            confirmParams: {
                // Make sure to change this to your payment completion page
                return_url: `${window.location.origin}`,
            },
        });

        if (error) {
            // This point will only be reached if there is an immediate error when
            // confirming the payment. Show error to your customer (for example, payment
            // details incomplete)
            setErrorMessage(error.message);
        } else {
            console.log('success');
        }
    };

    const PAYMENT_ELEMENT_OPTIONS = {
        wallets: ['visa', 'mastercard'],
    };


    return (
            <form onSubmit={handleSubmit} style={{ width: 500, margin: 'auto' }}>
                <PaymentElement options={PAYMENT_ELEMENT_OPTIONS}></PaymentElement>
                <Button type="submit" disabled={!stripe || !elements}>
                    Pay
                </Button>
            </form>

    );
};

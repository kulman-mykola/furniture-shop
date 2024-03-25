import { Body, Controller, Get, Post } from '@nestjs/common';
import { AppService } from './app.service';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';

@Controller()
export class AppController {
    constructor(@InjectStripeClient() private stripeClient: Stripe) {}

    @Post('create-intent')
    async create(@Body() data: any) {
        console.log(data);
        const { amount, currency } = data;

        const paymentIntent = await this.stripeClient.paymentIntents.create({
            amount,
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        console.log(paymentIntent);

        return { clientSecret: paymentIntent.client_secret };
    }
}

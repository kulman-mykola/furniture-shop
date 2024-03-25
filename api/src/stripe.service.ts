import { StripeWebhookHandler } from '@golevelup/nestjs-stripe';

export class StripeService {
    constructor() {}

    @StripeWebhookHandler('payment_intent.created')
    a(evt: any) {
        console.log('dumb');
    }

    @StripeWebhookHandler('payment_intent.succeeded')
    b(evt: any) {
        console.log('dumb');
    }

    @StripeWebhookHandler('charge.succeeded')
    d(evt: any) {
        console.log('dumb');
    }
}

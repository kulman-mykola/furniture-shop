import { Injectable } from '@nestjs/common';
import process from 'process';
import { StripeModule } from '@golevelup/nestjs-stripe';

@Injectable()
export class ConfigService {
    getStripeConfig(): any {
        return {
            apiKey: process.env.STRIPE_SECRET_KEY,
            webhookConfig: {
                requestBodyProperty: 'rawBody',
                stripeSecrets: { account: process.env.STRIPE_API_KEY },
            },
        };
    }
}

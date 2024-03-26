import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import Stripe from 'stripe';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { StripeService } from '../stripe.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Order } from './entities/order.entity'; // Import ConfigModule and ConfigService

@Module({
    imports: [
        TypeOrmModule.forFeature([Product, Order]),
        ConfigModule, // Import ConfigModule here
        StripeModule.forRootAsync(StripeModule, {
            useFactory: (configService: ConfigService) => ({
                apiKey: configService.get<string>('STRIPE_SECRET_KEY'), // Example: Fetch stripe API key from environment
                webhookConfig: {
                    requestBodyProperty: 'rawBody',
                    stripeSecrets: { account: configService.get<string>('STRIPE_API_KEY') }, // Example: Fetch stripe account key from environment
                },
            }),
            inject: [ConfigService],
        }),
    ],
    controllers: [OrdersController],
    providers: [OrdersService, StripeService],
})
export class OrdersModule {}

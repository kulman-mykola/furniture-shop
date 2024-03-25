import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import Stripe from 'stripe';

@Module({
    controllers: [OrdersController],
    providers: [OrdersService, Stripe],
})
export class OrdersModule {}

import { StripeWebhookHandler } from '@golevelup/nestjs-stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { Order } from './orders/entities/order.entity';
import { Repository } from 'typeorm';

export class StripeService {
    constructor(
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) {}

    @StripeWebhookHandler('payment_intent.created')
    a(evt: any) {}

    @StripeWebhookHandler('payment_intent.succeeded')
    async b(evt: any) {
        await this.orderRepository.update({ paymentIntent: evt.data.object.paymentIntent }, { isPaid: true });
    }

    @StripeWebhookHandler('charge.succeeded')
    async d(evt: any) {
        await this.orderRepository.update({ paymentIntent: evt.data.object.payment_intent }, { isPaid: true });
    }
}

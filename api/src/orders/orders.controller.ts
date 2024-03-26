import { Controller, Post, Body } from '@nestjs/common';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../products/entities/product.entity';
import { Repository, In } from 'typeorm';
import { Order } from './entities/order.entity';

@Controller('orders')
export class OrdersController {
    constructor(
        @InjectStripeClient()
        private stripeClient: Stripe,
        @InjectRepository(Product)
        private readonly productRepository: Repository<Product>,
        @InjectRepository(Order)
        private readonly orderRepository: Repository<Order>
    ) {}

    @Post('create-intent')
    async create(@Body() data: any) {
        console.log(data);
        const { cartItems, currency } = data;

        const items = await this.productRepository.find({
            where: { id: In([...cartItems.map(item => item.id)]) },
        });

        const amount =
            items.reduce((total, item) => {
                const cartItem = cartItems.find(carti => carti.id === item.id);
                const itemAmount = (cartItem ? cartItem.quantity : 0) * item.price;
                return total + itemAmount;
            }, 0) * 100;

        console.log(amount);

        const paymentIntent = await this.stripeClient.paymentIntents.create({
            amount: Math.ceil(amount),
            currency,
            automatic_payment_methods: {
                enabled: true,
            },
        });

        await this.orderRepository.save({
            userId: 0,
            cart: cartItems,
            paymentIntent: paymentIntent.id,
            total: amount / 100,
            isPaid: false,
        });

        return { clientSecret: paymentIntent.client_secret };
    }
}

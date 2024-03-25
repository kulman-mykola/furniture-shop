import { Controller, Post, Body } from '@nestjs/common';
import { InjectStripeClient } from '@golevelup/nestjs-stripe';
import Stripe from 'stripe';

@Controller('orders')
export class OrdersController {}

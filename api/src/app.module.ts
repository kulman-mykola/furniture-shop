import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ProductsModule } from './products/products.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './users/users.module';
import { OrdersModule } from './orders/orders.module';
import { StripeModule } from '@golevelup/nestjs-stripe';
import { StripeService } from './stripe.service';
import { ConfigModule } from '@nestjs/config';
import * as process from 'process';

@Module({
    imports: [
        ConfigModule.forRoot({ envFilePath: `.env` }),
        StripeModule.forRoot(StripeModule, {
            apiKey: process.env.STRIPE_SECRET_KEY,
            webhookConfig: {
                requestBodyProperty: 'rawBody',
                stripeSecrets: { account: process.env.STRIPE_API_KEY },
            },
        }),
        TypeOrmModule.forRoot({
            type: 'postgres',
            host: 'localhost',
            port: 2205,
            username: 'app_admin',
            password: 'admin1234',
            database: 'furniture_shop',
            entities: ['./dist/**/*.entity{.ts,.js}'],
            synchronize: true,
        }),
        UsersModule,
        ProductsModule,
        OrdersModule,
    ],
    controllers: [AppController],
    providers: [AppService, StripeService],
})
export class AppModule {}

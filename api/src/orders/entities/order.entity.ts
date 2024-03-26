import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';
import { CartInterface } from '../../common/interfaces/cart.interface';

@Entity()
export class Order {
    @PrimaryGeneratedColumn()
    id: number;

    @Column()
    userId: number;

    @Column({ type: 'jsonb' })
    cart: CartInterface;

    @Column()
    paymentIntent: string;

    @Column()
    isPaid: boolean;

    @Column({ type: 'float' })
    total: number;
}

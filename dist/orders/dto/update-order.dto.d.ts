import { OrderStatus } from '../schemas/order.schema';
export declare class UpdateOrderDto {
    status?: OrderStatus;
    paymentRef?: string;
    paymentMethod?: string;
}

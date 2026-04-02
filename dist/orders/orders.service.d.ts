import { Model } from 'mongoose';
import { OrderDocument } from './schemas/order.schema';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ShippingService } from '../shipping/shipping.service';
import { ProductsService } from '../products/products.service';
export declare class OrdersService {
    private orderModel;
    private shippingService;
    private productsService;
    constructor(orderModel: Model<OrderDocument>, shippingService: ShippingService, productsService: ProductsService);
    private generateOrderNumber;
    create(createOrderDto: CreateOrderDto, customerId?: string): Promise<OrderDocument>;
    findAll(): Promise<OrderDocument[]>;
    findByCustomer(customerId: string): Promise<OrderDocument[]>;
    findOne(id: string): Promise<OrderDocument>;
    findByOrderNumber(orderNumber: string): Promise<OrderDocument>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<OrderDocument>;
    updatePayment(id: string, paymentRef: string, paymentMethod: string, paymentDetails?: Record<string, unknown>): Promise<OrderDocument>;
    getStats(): Promise<{
        totalOrders: number;
        pendingOrders: number;
        paidOrders: number;
        totalRevenue: any;
    }>;
}

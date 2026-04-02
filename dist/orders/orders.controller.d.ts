import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
export declare class OrdersController {
    private readonly ordersService;
    constructor(ordersService: OrdersService);
    create(createOrderDto: CreateOrderDto, req: {
        user?: {
            id: string;
        };
    }): Promise<import("./schemas/order.schema").OrderDocument>;
    findAll(): Promise<import("./schemas/order.schema").OrderDocument[]>;
    getStats(): Promise<{
        totalOrders: number;
        pendingOrders: number;
        paidOrders: number;
        totalRevenue: any;
    }>;
    findMyOrders(req: {
        user: {
            id: string;
        };
    }): Promise<import("./schemas/order.schema").OrderDocument[]>;
    findOne(id: string): Promise<import("./schemas/order.schema").OrderDocument>;
    findByOrderNumber(orderNumber: string): Promise<import("./schemas/order.schema").OrderDocument>;
    update(id: string, updateOrderDto: UpdateOrderDto): Promise<import("./schemas/order.schema").OrderDocument>;
}

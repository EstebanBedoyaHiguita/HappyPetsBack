"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.OrdersService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const order_schema_1 = require("./schemas/order.schema");
const shipping_service_1 = require("../shipping/shipping.service");
const products_service_1 = require("../products/products.service");
let OrdersService = class OrdersService {
    orderModel;
    shippingService;
    productsService;
    constructor(orderModel, shippingService, productsService) {
        this.orderModel = orderModel;
        this.shippingService = shippingService;
        this.productsService = productsService;
    }
    async generateOrderNumber() {
        const date = new Date();
        const year = date.getFullYear().toString().slice(-2);
        const month = (date.getMonth() + 1).toString().padStart(2, '0');
        const day = date.getDate().toString().padStart(2, '0');
        const startOfDay = new Date(date.setHours(0, 0, 0, 0));
        const endOfDay = new Date(date.setHours(23, 59, 59, 999));
        const count = await this.orderModel.countDocuments({
            createdAt: { $gte: startOfDay, $lte: endOfDay },
        });
        const sequence = (count + 1).toString().padStart(4, '0');
        return `HP${year}${month}${day}-${sequence}`;
    }
    async create(createOrderDto, customerId) {
        const subtotal = createOrderDto.items.reduce((sum, item) => sum + item.price * item.quantity, 0);
        const shippingCalc = this.shippingService.calculateShipping(createOrderDto.shippingAddress.department, createOrderDto.shippingAddress.city, subtotal);
        const orderNumber = await this.generateOrderNumber();
        const order = new this.orderModel({
            orderNumber,
            customer: customerId,
            items: createOrderDto.items,
            subtotal,
            shipping: shippingCalc.shippingCost,
            total: shippingCalc.total,
            shippingAddress: createOrderDto.shippingAddress,
            status: order_schema_1.OrderStatus.PENDING,
        });
        return order.save();
    }
    async findAll() {
        return this.orderModel
            .find()
            .populate('customer', 'name email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findByCustomer(customerId) {
        return this.orderModel
            .find({ customer: customerId })
            .sort({ createdAt: -1 })
            .exec();
    }
    async findOne(id) {
        const order = await this.orderModel
            .findById(id)
            .populate('customer', 'name email')
            .exec();
        if (!order) {
            throw new common_1.NotFoundException('Orden no encontrada');
        }
        return order;
    }
    async findByOrderNumber(orderNumber) {
        const order = await this.orderModel
            .findOne({ orderNumber })
            .populate('customer', 'name email')
            .exec();
        if (!order) {
            throw new common_1.NotFoundException('Orden no encontrada');
        }
        return order;
    }
    async update(id, updateOrderDto) {
        const order = await this.orderModel
            .findByIdAndUpdate(id, updateOrderDto, { new: true })
            .populate('customer', 'name email')
            .exec();
        if (!order) {
            throw new common_1.NotFoundException('Orden no encontrada');
        }
        if (updateOrderDto.status === order_schema_1.OrderStatus.PAID) {
            for (const item of order.items) {
                await this.productsService.updateStock(item.product, item.quantity);
            }
        }
        return order;
    }
    async updatePayment(id, paymentRef, paymentMethod, paymentDetails) {
        const order = await this.orderModel
            .findByIdAndUpdate(id, {
            paymentRef,
            paymentMethod,
            paymentDetails,
            status: order_schema_1.OrderStatus.PAID,
        }, { new: true })
            .exec();
        if (!order) {
            throw new common_1.NotFoundException('Orden no encontrada');
        }
        for (const item of order.items) {
            await this.productsService.updateStock(item.product, item.quantity);
        }
        return order;
    }
    async getStats() {
        const [totalOrders, pendingOrders, paidOrders, totalRevenue] = await Promise.all([
            this.orderModel.countDocuments(),
            this.orderModel.countDocuments({ status: order_schema_1.OrderStatus.PENDING }),
            this.orderModel.countDocuments({ status: order_schema_1.OrderStatus.PAID }),
            this.orderModel.aggregate([
                {
                    $match: {
                        status: {
                            $in: [
                                order_schema_1.OrderStatus.PAID,
                                order_schema_1.OrderStatus.SHIPPED,
                                order_schema_1.OrderStatus.DELIVERED,
                            ],
                        },
                    },
                },
                { $group: { _id: null, total: { $sum: '$total' } } },
            ]),
        ]);
        return {
            totalOrders,
            pendingOrders,
            paidOrders,
            totalRevenue: totalRevenue[0]?.total || 0,
        };
    }
};
exports.OrdersService = OrdersService;
exports.OrdersService = OrdersService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(order_schema_1.Order.name)),
    __metadata("design:paramtypes", [mongoose_2.Model,
        shipping_service_1.ShippingService,
        products_service_1.ProductsService])
], OrdersService);
//# sourceMappingURL=orders.service.js.map
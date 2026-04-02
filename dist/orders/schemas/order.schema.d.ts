import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
export type OrderDocument = Order & Document;
export declare enum OrderStatus {
    PENDING = "pending",
    PAID = "paid",
    SHIPPED = "shipped",
    DELIVERED = "delivered",
    CANCELLED = "cancelled"
}
export declare class OrderItem {
    product: string;
    name: string;
    price: number;
    quantity: number;
    image: string;
}
export declare class ShippingAddress {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    department: string;
    zipCode: string;
    notes: string;
}
export declare class Order {
    orderNumber: string;
    customer: User;
    items: OrderItem[];
    subtotal: number;
    shipping: number;
    total: number;
    shippingAddress: ShippingAddress;
    status: OrderStatus;
    paymentRef: string;
    paymentMethod: string;
    paymentDetails: Record<string, unknown>;
}
export declare const OrderSchema: MongooseSchema<Order, import("mongoose").Model<Order, any, any, any, (Document<unknown, any, Order, any, import("mongoose").DefaultSchemaOptions> & Order & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Order, any, import("mongoose").DefaultSchemaOptions> & Order & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Order>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Order, Document<unknown, {}, Order, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    orderNumber?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    customer?: import("mongoose").SchemaDefinitionProperty<User, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    items?: import("mongoose").SchemaDefinitionProperty<OrderItem[], Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    subtotal?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    shipping?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    total?: import("mongoose").SchemaDefinitionProperty<number, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    shippingAddress?: import("mongoose").SchemaDefinitionProperty<ShippingAddress, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    status?: import("mongoose").SchemaDefinitionProperty<OrderStatus, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentRef?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentMethod?: import("mongoose").SchemaDefinitionProperty<string, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    paymentDetails?: import("mongoose").SchemaDefinitionProperty<Record<string, unknown>, Order, Document<unknown, {}, Order, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Order & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Order>;

declare class OrderItemDto {
    product: string;
    name: string;
    price: number;
    quantity: number;
    image?: string;
}
declare class ShippingAddressDto {
    name: string;
    phone: string;
    email: string;
    address: string;
    city: string;
    department: string;
    zipCode?: string;
    notes?: string;
}
export declare class CreateOrderDto {
    items: OrderItemDto[];
    shippingAddress: ShippingAddressDto;
}
export {};

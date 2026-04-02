import { ShippingService } from './shipping.service';
export declare class ShippingController {
    private readonly shippingService;
    constructor(shippingService: ShippingService);
    calculateShipping(department: string, city: string, subtotal: string): import("./shipping.service").ShippingCalculation;
    getRates(): {
        rates: import("./shipping-rates").ShippingRate[];
        freeShippingThreshold: number;
        defaultRate: number;
    };
    getDepartments(): string[];
}

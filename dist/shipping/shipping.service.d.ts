import { ShippingRate } from './shipping-rates';
export interface ShippingCalculation {
    subtotal: number;
    shippingCost: number;
    isFreeShipping: boolean;
    total: number;
    zone: number;
    department: string;
    city?: string;
}
export declare class ShippingService {
    private normalizeString;
    private findDepartmentRate;
    calculateShipping(department: string, city: string, subtotal: number): ShippingCalculation;
    getShippingRates(): {
        rates: ShippingRate[];
        freeShippingThreshold: number;
        defaultRate: number;
    };
    getDepartments(): string[];
}

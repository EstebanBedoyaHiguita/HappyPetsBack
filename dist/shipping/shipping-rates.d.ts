export interface ShippingRate {
    department: string;
    cities?: Record<string, number>;
    defaultRate: number;
    zone: 1 | 2 | 3;
}
export declare const SHIPPING_RATES: ShippingRate[];
export declare const FREE_SHIPPING_THRESHOLD = 150000;
export declare const DEFAULT_SHIPPING_RATE = 35000;

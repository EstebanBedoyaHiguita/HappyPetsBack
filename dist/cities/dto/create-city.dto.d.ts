import { ShippingZone } from '../schemas/city.schema';
export declare class CreateCityDto {
    name: string;
    department: string;
    zone: ShippingZone;
    active?: boolean;
}

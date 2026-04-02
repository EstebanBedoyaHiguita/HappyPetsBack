import { UserRole } from '../schemas/user.schema';
declare class AddressDto {
    street?: string;
    city?: string;
    department?: string;
    zipCode?: string;
}
export declare class CreateUserDto {
    name: string;
    email: string;
    password: string;
    phone?: string;
    address?: AddressDto;
    role?: UserRole;
}
export {};

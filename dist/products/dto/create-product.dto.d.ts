export declare class CreateProductDto {
    name: string;
    description: string;
    price: number;
    stock?: number;
    available?: boolean;
    featured?: boolean;
    category?: string;
    images?: string[];
}

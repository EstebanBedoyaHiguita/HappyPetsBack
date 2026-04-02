import { Model } from 'mongoose';
import { ProductDocument } from './schemas/product.schema';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
export declare class ProductsService {
    private productModel;
    constructor(productModel: Model<ProductDocument>);
    private generateUniqueSKU;
    create(createProductDto: CreateProductDto): Promise<ProductDocument>;
    findAll(filters?: {
        category?: string;
        available?: boolean;
        featured?: boolean;
        minPrice?: number;
        maxPrice?: number;
    }): Promise<ProductDocument[]>;
    findFeatured(limit?: number): Promise<ProductDocument[]>;
    findBestSellers(limit?: number): Promise<ProductDocument[]>;
    findOne(id: string): Promise<ProductDocument>;
    findBySku(sku: string): Promise<ProductDocument>;
    update(id: string, updateProductDto: UpdateProductDto): Promise<ProductDocument>;
    remove(id: string): Promise<void>;
    updateStock(id: string, quantity: number): Promise<ProductDocument>;
}

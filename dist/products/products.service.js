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
exports.ProductsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const product_schema_1 = require("./schemas/product.schema");
let ProductsService = class ProductsService {
    productModel;
    constructor(productModel) {
        this.productModel = productModel;
    }
    async generateUniqueSKU() {
        let sku;
        let exists = true;
        while (exists) {
            const random = Math.floor(10000 + Math.random() * 90000);
            sku = `HP-${random}`;
            const existingProduct = await this.productModel.findOne({ sku });
            exists = !!existingProduct;
        }
        return sku;
    }
    async create(createProductDto) {
        const sku = await this.generateUniqueSKU();
        const product = new this.productModel({
            ...createProductDto,
            sku,
        });
        return product.save();
    }
    async findAll(filters) {
        const query = {};
        if (filters?.category) {
            query.category = filters.category;
        }
        if (filters?.available !== undefined) {
            query.available = filters.available;
        }
        if (filters?.featured !== undefined) {
            query.featured = filters.featured;
        }
        if (filters?.minPrice !== undefined || filters?.maxPrice !== undefined) {
            query.price = {};
            if (filters?.minPrice !== undefined) {
                query.price.$gte = filters.minPrice;
            }
            if (filters?.maxPrice !== undefined) {
                query.price.$lte = filters.maxPrice;
            }
        }
        return this.productModel.find(query).populate('category').exec();
    }
    async findFeatured(limit = 8) {
        return this.productModel
            .find({ featured: true, available: true })
            .populate('category')
            .limit(limit)
            .exec();
    }
    async findBestSellers(limit = 8) {
        return this.productModel
            .find({ available: true })
            .populate('category')
            .sort({ salesCount: -1 })
            .limit(limit)
            .exec();
    }
    async findOne(id) {
        const product = await this.productModel
            .findById(id)
            .populate('category')
            .exec();
        if (!product) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        return product;
    }
    async findBySku(sku) {
        const product = await this.productModel
            .findOne({ sku })
            .populate('category')
            .exec();
        if (!product) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        return product;
    }
    async update(id, updateProductDto) {
        const product = await this.productModel
            .findByIdAndUpdate(id, updateProductDto, { new: true })
            .populate('category')
            .exec();
        if (!product) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        return product;
    }
    async remove(id) {
        const result = await this.productModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
    }
    async updateStock(id, quantity) {
        const product = await this.productModel
            .findByIdAndUpdate(id, { $inc: { stock: -quantity, salesCount: quantity } }, { new: true })
            .exec();
        if (!product) {
            throw new common_1.NotFoundException('Producto no encontrado');
        }
        return product;
    }
};
exports.ProductsService = ProductsService;
exports.ProductsService = ProductsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(product_schema_1.Product.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], ProductsService);
//# sourceMappingURL=products.service.js.map
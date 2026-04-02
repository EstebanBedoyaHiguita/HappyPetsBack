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
exports.PostsService = void 0;
const common_1 = require("@nestjs/common");
const mongoose_1 = require("@nestjs/mongoose");
const mongoose_2 = require("mongoose");
const post_schema_1 = require("./schemas/post.schema");
let PostsService = class PostsService {
    postModel;
    constructor(postModel) {
        this.postModel = postModel;
    }
    generateSlug(title) {
        return title
            .toLowerCase()
            .normalize('NFD')
            .replace(/[\u0300-\u036f]/g, '')
            .replace(/[^a-z0-9]+/g, '-')
            .replace(/(^-|-$)/g, '');
    }
    async create(createPostDto, authorId) {
        const slug = createPostDto.slug || this.generateSlug(createPostDto.title);
        const post = new this.postModel({
            ...createPostDto,
            slug,
            author: authorId,
        });
        return (await post.save()).populate('author', 'name email');
    }
    async findAll(publishedOnly = false) {
        const filter = publishedOnly ? { published: true } : {};
        return this.postModel
            .find(filter)
            .populate('author', 'name email')
            .sort({ createdAt: -1 })
            .exec();
    }
    async findOne(id) {
        const post = await this.postModel
            .findById(id)
            .populate('author', 'name email')
            .exec();
        if (!post) {
            throw new common_1.NotFoundException('Publicacion no encontrada');
        }
        return post;
    }
    async findBySlug(slug) {
        const post = await this.postModel
            .findOne({ slug, published: true })
            .populate('author', 'name email')
            .exec();
        if (!post) {
            throw new common_1.NotFoundException('Publicacion no encontrada');
        }
        return post;
    }
    async update(id, updatePostDto) {
        if (updatePostDto.title && !updatePostDto.slug) {
            updatePostDto.slug = this.generateSlug(updatePostDto.title);
        }
        const post = await this.postModel
            .findByIdAndUpdate(id, updatePostDto, { new: true })
            .populate('author', 'name email')
            .exec();
        if (!post) {
            throw new common_1.NotFoundException('Publicacion no encontrada');
        }
        return post;
    }
    async remove(id) {
        const result = await this.postModel.findByIdAndDelete(id).exec();
        if (!result) {
            throw new common_1.NotFoundException('Publicacion no encontrada');
        }
    }
};
exports.PostsService = PostsService;
exports.PostsService = PostsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, mongoose_1.InjectModel)(post_schema_1.Post.name)),
    __metadata("design:paramtypes", [mongoose_2.Model])
], PostsService);
//# sourceMappingURL=posts.service.js.map
import { Model } from 'mongoose';
import { PostDocument } from './schemas/post.schema';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsService {
    private postModel;
    constructor(postModel: Model<PostDocument>);
    private generateSlug;
    create(createPostDto: CreatePostDto, authorId: string): Promise<PostDocument>;
    findAll(publishedOnly?: boolean): Promise<PostDocument[]>;
    findOne(id: string): Promise<PostDocument>;
    findBySlug(slug: string): Promise<PostDocument>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<PostDocument>;
    remove(id: string): Promise<void>;
}

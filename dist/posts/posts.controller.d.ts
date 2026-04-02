import { PostsService } from './posts.service';
import { CreatePostDto } from './dto/create-post.dto';
import { UpdatePostDto } from './dto/update-post.dto';
export declare class PostsController {
    private readonly postsService;
    constructor(postsService: PostsService);
    create(createPostDto: CreatePostDto, req: {
        user: {
            id: string;
        };
    }): Promise<import("./schemas/post.schema").PostDocument>;
    findAll(published?: string): Promise<import("./schemas/post.schema").PostDocument[]>;
    findOne(id: string): Promise<import("./schemas/post.schema").PostDocument>;
    findBySlug(slug: string): Promise<import("./schemas/post.schema").PostDocument>;
    update(id: string, updatePostDto: UpdatePostDto): Promise<import("./schemas/post.schema").PostDocument>;
    remove(id: string): Promise<void>;
}

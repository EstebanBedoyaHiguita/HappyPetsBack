import { Document, Schema as MongooseSchema } from 'mongoose';
import { User } from '../../users/schemas/user.schema';
export type PostDocument = Post & Document;
export declare class Post {
    title: string;
    slug: string;
    content: string;
    excerpt: string;
    coverImage: string;
    author: User;
    published: boolean;
}
export declare const PostSchema: MongooseSchema<Post, import("mongoose").Model<Post, any, any, any, (Document<unknown, any, Post, any, import("mongoose").DefaultSchemaOptions> & Post & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
} & {
    id: string;
}) | (Document<unknown, any, Post, any, import("mongoose").DefaultSchemaOptions> & Post & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}), any, Post>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Post, Document<unknown, {}, Post, {
    id: string;
}, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Post & {
    _id: import("mongoose").Types.ObjectId;
} & {
    __v: number;
}, "id"> & {
    id: string;
}, {
    title?: import("mongoose").SchemaDefinitionProperty<string, Post, Document<unknown, {}, Post, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    slug?: import("mongoose").SchemaDefinitionProperty<string, Post, Document<unknown, {}, Post, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    content?: import("mongoose").SchemaDefinitionProperty<string, Post, Document<unknown, {}, Post, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    excerpt?: import("mongoose").SchemaDefinitionProperty<string, Post, Document<unknown, {}, Post, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    coverImage?: import("mongoose").SchemaDefinitionProperty<string, Post, Document<unknown, {}, Post, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    author?: import("mongoose").SchemaDefinitionProperty<User, Post, Document<unknown, {}, Post, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
    published?: import("mongoose").SchemaDefinitionProperty<boolean, Post, Document<unknown, {}, Post, {
        id: string;
    }, import("mongoose").ResolveSchemaOptions<import("mongoose").DefaultSchemaOptions>> & Omit<Post & {
        _id: import("mongoose").Types.ObjectId;
    } & {
        __v: number;
    }, "id"> & {
        id: string;
    }> | undefined;
}, Post>;

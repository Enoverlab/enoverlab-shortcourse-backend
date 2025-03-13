import { Document } from 'mongoose';
export declare class Author extends Document {
    name: string;
    image: string;
}
export declare const AuthorSchema: import("mongoose").Schema<Author, import("mongoose").Model<Author, any, any, any, Document<unknown, any, Author> & Author & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Author, Document<unknown, {}, import("mongoose").FlatRecord<Author>> & import("mongoose").FlatRecord<Author> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;
export declare class Blog extends Document {
    title: string;
    content: string;
    description: string;
    image: string;
    tag: string;
    status: string;
    author: Author;
}
export declare const BlogSchema: import("mongoose").Schema<Blog, import("mongoose").Model<Blog, any, any, any, Document<unknown, any, Blog> & Blog & Required<{
    _id: unknown;
}> & {
    __v: number;
}, any>, {}, {}, {}, {}, import("mongoose").DefaultSchemaOptions, Blog, Document<unknown, {}, import("mongoose").FlatRecord<Blog>> & import("mongoose").FlatRecord<Blog> & Required<{
    _id: unknown;
}> & {
    __v: number;
}>;

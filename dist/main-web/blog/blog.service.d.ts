import { Blog } from './blog.schema';
import { Model } from 'mongoose';
export declare class BlogService {
    private readonly blogModel;
    constructor(blogModel: Model<Blog>);
    getAllBlogs(search?: string, page?: number, limit?: number): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, Blog> & Blog & Required<{
            _id: unknown;
        }> & {
            __v: number;
        })[];
        pagination: {
            currentPage: number;
            totalPages: number;
            totalBlogs: number;
            pageSize: number;
        };
    }>;
    getBlogDetails(blogId: string): Promise<import("mongoose").Document<unknown, {}, Blog> & Blog & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}

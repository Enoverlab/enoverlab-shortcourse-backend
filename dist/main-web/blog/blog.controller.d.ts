import { BlogService } from './blog.service';
export declare class BlogController {
    private readonly blogService;
    constructor(blogService: BlogService);
    getAllBlogs(search?: string, page?: string, limit?: string): Promise<{
        blogs: (import("mongoose").Document<unknown, {}, import("./blog.schema").Blog> & import("./blog.schema").Blog & Required<{
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
    getBlogDetails(blogId: string): Promise<import("mongoose").Document<unknown, {}, import("./blog.schema").Blog> & import("./blog.schema").Blog & Required<{
        _id: unknown;
    }> & {
        __v: number;
    }>;
}

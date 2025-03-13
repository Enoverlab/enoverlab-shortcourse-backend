import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Blog } from './blog.schema';
import { Model } from 'mongoose';

@Injectable()
export class BlogService {
    constructor(@InjectModel(Blog.name) private readonly blogModel: Model<Blog>) {}

  // Fetch all blogs with search, pagination, and filtering
  async getAllBlogs(search?: string, page: number = 1, limit: number = 10) {
    const regex = new RegExp(search || '', 'i'); // Case-insensitive search
    const skip = (page - 1) * limit;

    // Count total published blogs matching search
    const totalBlogs = await this.blogModel.countDocuments({
      $and: [
        { $or: [{ title: { $regex: regex } }, { content: { $regex: regex } }] },
        { status: 'Published' },
      ],
    });

    // Get paginated blog results
    const blogs = await this.blogModel
      .find({
        $and: [
          { $or: [{ title: { $regex: regex } }, { content: { $regex: regex } }] },
          { status: 'Published' },
        ],
      })
      .populate('author')
      .sort({ createdAt: -1 })
      .skip(skip)
      .limit(limit)
      .exec();

    return {
      blogs,
      pagination: {
        currentPage: page,
        totalPages: Math.ceil(totalBlogs / limit),
        totalBlogs,
        pageSize: limit,
      },
    };
  }

  // Fetch single blog details
  async getBlogDetails(blogId: string) {
    const details = await this.blogModel.findById(blogId, 'title content image');
    if (!details) {
      throw new NotFoundException('Blog not found');
    }
    return details;
  }
}

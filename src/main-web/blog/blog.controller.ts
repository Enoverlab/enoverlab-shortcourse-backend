import { Controller, Get, Query } from '@nestjs/common';
import { BlogService } from './blog.service';

@Controller('/api/v1/')
export class BlogController {
    constructor(private readonly blogService: BlogService) {}

  // Route: Get all blogs with search & pagination
  @Get('/getallblogs')
  async getAllBlogs(
    @Query('search') search?: string,
    @Query('page') page?: string,
    @Query('limit') limit?: string
  ) {
    const pageNum = parseInt(page) || 1;
    const limitNum = parseInt(limit) || 10;
    return this.blogService.getAllBlogs(search, pageNum, limitNum);
  }

  // Route: Get single blog details
  @Get('/getblogDetails')
  async getBlogDetails(@Query('blogId') blogId: string) {
    return this.blogService.getBlogDetails(blogId);
  }
}

import { CreatePostDto } from '@/domain/dto/posts/create-post.dto';
import { PostsService } from '@/services/posts/posts.service';
import { Post as PostModel } from '@/domain/models/posts.model';
import { UsersService } from '@/services/users/users.service';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
  Put,
  UseGuards,
} from '@nestjs/common';
import { EditPostDto } from '@/domain/dto/posts/edit-post.dto';
import { PostManagementGuard } from '@/middleware/posts/post-manage.guard';
import { Public } from '@/domain/decorators/public.decorator';

@Controller('posts')
export class PostsController {
  @Inject(PostsService) private readonly postsService: PostsService;
  @Inject(UsersService) private readonly usersService: UsersService;

  @Post('/create')
  @HttpCode(200)
  public async create(@Body() createPostDto: CreatePostDto): Promise<void> {
    return this.postsService.create(createPostDto);
  }

  @Get()
  public async getAll(): Promise<PostModel[]> {
    return this.postsService.getAll();
  }

  @Put('/edit/:postId')
  @UseGuards(PostManagementGuard)
  @HttpCode(200)
  public async edit(
    @Param('postId') postId: string,
    @Body() editPostDto: EditPostDto,
  ): Promise<void> {
    return this.postsService.edit(postId, editPostDto);
  }

  @Delete('/delete/:postId')
  @UseGuards(PostManagementGuard)
  @HttpCode(200)
  public async deletePost(@Param('postId') postId: string): Promise<void> {
    return this.postsService.delete(postId);
  }

  @Get('/users/:userId')
  @HttpCode(200)
  @Public()
  public async getAllByUserId(
    @Param('userId') userId: number,
  ): Promise<PostModel[]> {
    return this.postsService.getAllByUserId(userId);
  }
}

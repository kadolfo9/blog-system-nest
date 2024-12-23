import { CreatePostDto } from "@/posts/dto/create-post.dto";
import { PostsService } from "@/posts/posts.service";
import { Post as PostModel } from "@/posts/models/posts.model";
import { UsersService } from "@/users/users.service";
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
} from "@nestjs/common";
import { EditPostDto } from "@/posts/dto/edit-post.dto";
import { PostManagementGuard } from "@/posts/guards/post-manage.guard";
import { Public } from "@/auth/decorators/public.decorator";
import { AuthorizedUser } from "@/users/decorators/authorized-user.decorator";
import { UsersRoles } from "@/users/enums/users.roles";

@Controller("posts")
export class PostsController {
  @Inject(PostsService)
  private readonly postsService: PostsService;

  @Inject(UsersService)
  private readonly usersService: UsersService;

  @Post("/create")
  @HttpCode(200)
  public async create(@Body() createPostDto: CreatePostDto): Promise<PostModel> {
    // TODO: dont return void.. returns post.
    return this.postsService.create(createPostDto);
  }

  @Get()
  public async getAll(): Promise<PostModel[]> {
    return this.postsService.getAll();
  }

  @Get("/:postId")
  public async get(@Param("postId") postId: string): Promise<PostModel> {
    return this.postsService.get(postId);
  }

  @Put("/edit/:postId")
  @AuthorizedUser(UsersRoles.ADMIN)
  @UseGuards(PostManagementGuard)
  @HttpCode(200)
  public async edit(
    @Param("postId") postId: string,
    @Body() editPostDto: EditPostDto,
  ): Promise<void> {
    return this.postsService.edit(postId, editPostDto);
  }

  @Delete("/delete/:postId")
  @AuthorizedUser(UsersRoles.ADMIN)
  @UseGuards(PostManagementGuard)
  @HttpCode(200)
  public async deletePost(@Param("postId") postId: string): Promise<void> {
    return this.postsService.delete(postId);
  }

  @Get("/users/:userId")
  @HttpCode(200)
  @Public()
  public async getAllByUserId(
    @Param("userId") userId: number,
  ): Promise<PostModel[]> {
    return this.postsService.getAllByUserId(userId);
  }
}

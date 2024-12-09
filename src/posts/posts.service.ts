import { CreatePostDto } from "@/posts/dto/create-post.dto";
import { Post } from "@/posts/models/posts.model";
import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Logger,
  NotFoundException,
  Request,
  Scope,
} from "@nestjs/common";
import { InjectModel } from "@nestjs/sequelize";
import { AuthService } from "@/auth/auth.service";
import { REQUEST } from "@nestjs/core";
import { EditPostDto } from "@/posts/dto/edit-post.dto";

@Injectable({ scope: Scope.REQUEST })
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  @Inject(AuthService)
  private readonly authService: AuthService;
  @InjectModel(Post)
  private readonly postModel: typeof Post;

  @Inject(REQUEST)
  private readonly request: Request;

  public async create(createPostDto: CreatePostDto): Promise<void> {
    const currentUser = await this.authService.getUser(this.request);

    this.postModel
      .create({
        ...createPostDto,
        userId: currentUser?.id,
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async edit(
    postId: string,
    editPostDto: Partial<EditPostDto>,
  ): Promise<void> {
    await this.postModel.update(editPostDto, {
      where: {
        id: postId,
      },
    });
  }

  public async delete(postId: string): Promise<void> {
    await this.postModel.destroy({
      where: { id: postId },
    });
  }

  public async get(postId: string): Promise<Post> {
    const post = await this.postModel.findOne({ where: { id: postId } });

    if (!post) throw new NotFoundException("Post not found.");

    return post.toJSON();
  }

  public async getAllByUserId(userId: number): Promise<Post[]> {
    return this.postModel.findAll({
      where: { userId },
    });
  }

  public async getAll(): Promise<Post[]> {
    return this.postModel.findAll();
  }
}

import { CreatePostDto } from "@/posts/models/dto/create-post.dto";
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
import { EditPostDto } from "@/posts/models/dto/edit-post.dto";
import { CommentsService } from "./comments/comments.service";
import { User } from "@/users/models/users.model";

@Injectable({ scope: Scope.REQUEST })
export class PostsService {
  private readonly logger = new Logger(PostsService.name);

  @Inject(AuthService)
  private readonly authService: AuthService;

  @Inject(CommentsService)
  private readonly commentsService: CommentsService;

  @InjectModel(Post)
  private readonly postModel: typeof Post;

  @Inject(REQUEST)
  private readonly request: Request;

  public async create(createPostDto: CreatePostDto): Promise<Post> {
    const currentUser = await this.authService.getUser(this.request);

    const post = await this.postModel
      .create({
        ...createPostDto,
        userId: currentUser?.id,
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });

    return post;
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
      where: {
        id: postId,
      },
    });
  }

  public async get(postId: string): Promise<Post> {
    const post = await this.postModel.findOne({
      where: { id: postId },
      include: [
        {
          model: User,
          attributes: ["id", "username"],
        },
        "comments",
      ],
      attributes: {
        exclude: ["userId"],
      },
    });

    if (!post) throw new NotFoundException("Post not found.");

    const comments = await this.commentsService.getByPostId(postId);
    post.comments = comments;

    return post.toJSON();
  }

  public async getAllByUserId(userId: number): Promise<Post[]> {
    return this.postModel.findAll({
      where: { userId },
      attributes: {
        exclude: ["comments"],
      },
    });
  }

  public async getAll(): Promise<Post[]> {
    return await this.postModel.findAll({
      attributes: {
        exclude: ["comments"],
      },
    });
  }
}

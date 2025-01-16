import {
  HttpException,
  HttpStatus,
  Inject,
  Injectable,
  Scope,
} from "@nestjs/common";
import { REQUEST } from "@nestjs/core";
import { CreateCommentDto } from "./models/dto/create-comment.dto";
import { AuthService } from "@/auth/auth.service";
import { InjectModel } from "@nestjs/sequelize";
import { Comment } from "./models/comments.model";
import { EditCommentDto } from "./models/dto/edit-comment.dto";

@Injectable({ scope: Scope.REQUEST })
export class CommentsService {
  @Inject(AuthService)
  private readonly authService: AuthService;

  @InjectModel(Comment)
  private readonly commentModel: typeof Comment;

  @Inject(REQUEST)
  private readonly request: Request;

  public async create(
    postId: string,
    createCommentDto: CreateCommentDto,
  ): Promise<void> {
    const currentUser = await this.authService.getUser(this.request);

    this.commentModel
      .create({
        ...createCommentDto,
        userId: currentUser?.id,
        postId,
      })
      .catch((error) => {
        throw new HttpException(error, HttpStatus.INTERNAL_SERVER_ERROR);
      });
  }

  public async edit(
    commentId: string,
    editCommentDto: Partial<EditCommentDto>,
  ): Promise<void> {
    await this.commentModel.update(editCommentDto, {
      where: {
        id: commentId,
      },
    });
  }

  public async delete(commentId: string): Promise<void> {
    await this.commentModel.destroy({
      where: {
        id: commentId,
      },
    });
  }

  public async getByPostId(postId: string): Promise<Comment[]> {
    return await this.commentModel.findAll({
      where: {
        postId: postId,
      },
    });
  }

  public async getByUserId(userId: string): Promise<Comment[]> {
    return await this.commentModel.findAll({
      where: {
        userId: userId,
      },
    });
  }
}

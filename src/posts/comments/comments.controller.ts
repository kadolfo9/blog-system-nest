import {
  Body,
  Controller,
  Get,
  HttpCode,
  Inject,
  Param,
  Post,
} from "@nestjs/common";
import { CreateCommentDto } from "./models/dto/create-comment.dto";
import { CommentsService } from "./comments.service";
import { Comment } from "./models/comments.model";
import { Public } from "@/auth/decorators/public.decorator";

@Controller("posts/comments")
export class CommentsController {
  @Inject(CommentsService)
  private readonly commentsService: CommentsService;

  @Post("/:postId/create")
  @HttpCode(200)
  public async create(
    @Param("postId") postId: string,
    @Body() createCommentDto: CreateCommentDto,
  ): Promise<void> {
    return this.commentsService.create(postId, createCommentDto);
  }

  @Get("/:postId")
  @Public()
  public async get(@Param("postId") postId: string): Promise<Comment[]> {
    return this.commentsService.getByPostId(postId);
  }
}

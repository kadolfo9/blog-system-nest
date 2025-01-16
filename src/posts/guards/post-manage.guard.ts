import { User } from "@/users/models/users.model";
import { PostsService } from "@/posts/posts.service";
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from "@nestjs/common";
import { UsersRoles } from "@/users/enums/users.roles";

@Injectable()
export class PostManagementGuard implements CanActivate {
  @Inject(PostsService) private postsService: PostsService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request?.user as User;

    if (!user) {
      throw new UnauthorizedException();
    }

    const postId = request?.params?.postId;

    if (!postId) {
      throw new BadRequestException("Post id not defined.");
    }

    const post = await this.postsService.get(postId);

    if (!post) {
      throw new NotFoundException("Post not found.");
    }

    if (
      post.user?.id !== user?.id ||
      (post.user?.id !== user?.id && user?.role !== UsersRoles.ADMIN)
    ) {
      throw new ForbiddenException("User is not the owner of the post.");
    }

    return true;
  }
}

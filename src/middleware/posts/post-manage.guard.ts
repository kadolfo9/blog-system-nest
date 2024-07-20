import { Roles } from '@/domain/enums/roles';
import { User } from '@/domain/models/users.model';
import { PostsService } from '@/services/posts/posts.service';
import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  ForbiddenException,
  Inject,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';

@Injectable()
export class PostManagementGuard implements CanActivate {
  @Inject(PostsService) private postsService: PostsService;

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const user = request?.user as User;

    if (!user) {
      throw new UnauthorizedException('Request unauthorized.');
    }

    const postId = request?.params?.postId;

    if (!postId) {
      throw new BadRequestException('Post id not defined.');
    }

    const post = await this.postsService.get(postId);
    console.log('post data:', post);

    if (!post) {
      throw new NotFoundException('Post not found.');
    }

    if (
      post.userId !== user?.id ||
      (post.userId !== user?.id && user?.access !== Roles.ADMIN)
    ) {
      throw new ForbiddenException('User is not the owner of the post.');
    }

    return true;
  }
}
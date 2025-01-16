import { Post } from "@/posts/models/posts.model";
import { AuthService } from "@/auth/auth.service";
import { PostsService } from "@/posts/posts.service";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "@/users/users.module";
import { PostsController } from "@/posts/posts.controller";
import { CommentsModule } from "@/posts/comments/comments.module";
import { UploadsModule } from "@/uploads/uploads.module";

@Module({
  imports: [
    SequelizeModule.forFeature([Post]),
    UsersModule,
    CommentsModule,
    UploadsModule,
  ],
  exports: [PostsService],
  providers: [PostsService, AuthService, CommentsModule, UploadsModule],
  controllers: [PostsController],
})
export class PostsModule {}

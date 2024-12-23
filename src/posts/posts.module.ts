import { Post } from "@/posts/models/posts.model";
import { AuthService } from "@/auth/auth.service";
import { PostsService } from "@/posts/posts.service";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { UsersModule } from "@/users/users.module";
import { PostsController } from "@/posts/posts.controller";
import { CommentsModule } from "./comments/comments.module";

@Module({
  imports: [CommentsModule, UsersModule, SequelizeModule.forFeature([Post])],
  exports: [PostsService, SequelizeModule],
  providers: [PostsService, AuthService, CommentsModule],
  controllers: [PostsController],
})
export class PostsModule {}

import { Module } from "@nestjs/common";
import { UploadsController } from "./uploads.controller";
import { SequelizeModule } from "@nestjs/sequelize";
import { Uploads } from "./models/uploads.model";
import { UploadsService } from "./uploads.service";
import { PostsService } from "@/posts/posts.service";
import { AuthService } from "@/auth/auth.service";
import { CommentsService } from "@/posts/comments/comments.service";
import { Post } from "@/posts/models/posts.model";
import { UsersService } from "@/users/users.service";
import { User } from "@/users/models/users.model";
import { Comment } from "@/posts/comments/models/comments.model";

@Module({
  imports: [SequelizeModule.forFeature([Uploads, Post, User, Comment])],
  exports: [UploadsService],
  providers: [
    UploadsService,
    PostsService,
    AuthService,
    CommentsService,
    UsersService,
  ],
  controllers: [UploadsController],
})
export class UploadsModule {}

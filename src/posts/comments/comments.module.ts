import { UsersModule } from "@/users/users.module";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentsService } from "./comments.service";
import { AuthService } from "@/auth/auth.service";
import { Comment } from "./models/comments.model";
import { UsersService } from "@/users/users.service";
import { CommentsController } from "./comments.controller";

@Module({
  imports: [UsersModule, SequelizeModule.forFeature([Comment])],
  exports: [CommentsService, SequelizeModule],
  providers: [UsersService, AuthService, CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}

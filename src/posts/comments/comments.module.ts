import { UsersModule } from "@/users/users.module";
import { Module } from "@nestjs/common";
import { SequelizeModule } from "@nestjs/sequelize";
import { CommentsService } from "./comments.service";
import { AuthService } from "@/auth/auth.service";
import { Comment } from "./models/comments.model";
import { UsersService } from "@/users/users.service";
import { CommentsController } from "./comments.controller";

@Module({
  imports: [SequelizeModule.forFeature([Comment]), UsersModule],
  exports: [CommentsService],
  providers: [UsersService, AuthService, CommentsService],
  controllers: [CommentsController],
})
export class CommentsModule {}

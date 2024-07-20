import { Post } from '@/domain/models/posts.model';
import { AuthService } from '@/services/auth/auth.service';
import { PostsService } from '@/services/posts/posts.service';
import { Module } from '@nestjs/common';
import { SequelizeModule } from '@nestjs/sequelize';
import { UsersModule } from './users.module';
import { PostsController } from '@/controllers/posts.controller';

@Module({
  imports: [UsersModule, SequelizeModule.forFeature([Post])],
  exports: [PostsService, SequelizeModule],
  providers: [PostsService, AuthService],
  controllers: [PostsController],
})
export class PostsModule {}

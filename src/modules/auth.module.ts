import { Module } from '@nestjs/common';
import { AuthController } from '@/controllers/auth.controller';
import { AuthService } from '@/services/auth/auth.service';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from '@/middleware/auth.guard';
import { UsersModule } from './users.module';
import { PostsModule } from './posts.module';

@Module({
  imports: [PostsModule, UsersModule],
  controllers: [AuthController],
  providers: [
    AuthService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AuthModule {}

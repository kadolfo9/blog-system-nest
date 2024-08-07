import { Module } from '@nestjs/common';
import { UsersService } from '@/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from './models/users.model';

@Module({
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}

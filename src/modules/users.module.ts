import { Module } from '@nestjs/common';
import { UsersService } from '@/services/users/users.service';
import { SequelizeModule } from '@nestjs/sequelize';
import { User } from '@/domain/models/users.model';

@Module({
  providers: [UsersService],
  imports: [SequelizeModule.forFeature([User])],
  exports: [UsersService, SequelizeModule],
})
export class UsersModule {}

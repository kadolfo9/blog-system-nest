import { Module } from '@nestjs/common';
import { AppService } from '@/services/app.service';
import { AuthModule } from '@/modules/auth.module';
import { UsersModule } from '@/modules/users.module';
import { ConfigModule } from '@nestjs/config';
import { SequelizeModule } from '@nestjs/sequelize';
import { Dialect } from 'sequelize';
import { JwtModule } from '@nestjs/jwt';
import { AuthService } from '@/services/auth/auth.service';
import { PostsModule } from './posts.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: '.development.env',
      cache: true,
    }),

    SequelizeModule.forRoot({
      dialect: <Dialect>process.env.DATABASE_DIALECT,
      host: process.env.DATABASE_HOST,
      port: parseInt(process.env.DATABASE_PORT),
      username: process.env.DATABASE_USERNAME,
      password: process.env.DATABASE_PASSWORD,
      database: process.env.DATABASE_NAME,
      autoLoadModels: true,
      synchronize: true,
      logging: false,
      timezone: '-03:00',
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: '30d',
      },
    }),

    PostsModule,
    UsersModule,
    AuthModule,
  ],
  controllers: [],
  providers: [AppService, AuthService],
})
export class AppModule {}

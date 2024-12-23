import { Module } from "@nestjs/common";
import { AppService } from "@/app/app.service";
import { AuthModule } from "@/auth/auth.module";
import { UsersModule } from "@/users/users.module";
import { ConfigModule } from "@nestjs/config";
import { SequelizeModule } from "@nestjs/sequelize";
import { Dialect } from "sequelize";
import { JwtModule } from "@nestjs/jwt";
import { AuthService } from "@/auth/auth.service";
import { PostsModule } from "@/posts/posts.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      envFilePath: ".env",
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
      synchronize: false,
      logging: false,
      timezone: "-03:00",
    }),

    JwtModule.register({
      global: true,
      secret: process.env.JWT_SECRET,
      signOptions: {
        expiresIn: "30d",
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

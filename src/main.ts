import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app/app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import * as cookieParser from "cookie-parser";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      origin: ["http://localhost:5173", "http://127.0.0.1:5173"],
      methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
      credentials: true,
      allowedHeaders: [
        "Content-Type",
        "Authorization",
        "Access-Control-Allow-Credentials",
        "Access-Control-Allow-Origin",
        "Accept",
      ],
    },
  });

  app.use(cookieParser());

  app.useGlobalPipes(
    new ValidationPipe({
      exceptionFactory: (errors) => {
        const result = errors.map(
          (error) => error.constraints[Object.keys(error.constraints)[0]],
        );
        return new BadRequestException(result);
      },
      stopAtFirstError: true,
    }),
  );

  const swaggerConfig = new DocumentBuilder()
    .setTitle("BlogSystem API")
    .setDescription("BlogSystem API document")
    .setVersion("1.0.0")
    .addBearerAuth()
    .build();

  SwaggerModule.setup(
    "api",
    app,
    SwaggerModule.createDocument(app, swaggerConfig),
  );

  await app.listen(3000);
}
bootstrap();

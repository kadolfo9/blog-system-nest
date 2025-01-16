import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app/app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: {
      //origin:
      methods: ["GET", "POST", "PUT", "DELETE"],
      allowedHeaders: ["Content-Type", "Authorization"],
    },
  });

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

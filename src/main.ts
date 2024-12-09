import { NestFactory } from "@nestjs/core";
import { AppModule } from "@/app/app.module";
import { BadRequestException, ValidationPipe } from "@nestjs/common";

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    cors: true,
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

  await app.listen(3000);
}
bootstrap();

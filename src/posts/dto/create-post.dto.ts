import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class CreatePostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  content: string;
}

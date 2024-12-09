import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class EditPostDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  title: string;

  @IsString()
  @IsNotEmpty()
  @MinLength(1)
  content: string;
}

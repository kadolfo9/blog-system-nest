import { IsNotEmpty, IsString, MinLength } from "class-validator";

export class EditCommentDto {
  @IsString()
  @IsNotEmpty()
  @MinLength(3)
  content: string;
}

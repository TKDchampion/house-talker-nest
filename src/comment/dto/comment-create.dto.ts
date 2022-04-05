import { IsBoolean, IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CommentCreateDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsNumber()
  @IsNotEmpty()
  articleId: number;

  @IsBoolean()
  isHiddenName: boolean;
}

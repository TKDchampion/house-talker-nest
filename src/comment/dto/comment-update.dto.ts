import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class CommentUpdateDto {
  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isHiddenName: boolean;
}

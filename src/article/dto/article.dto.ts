import { IsBoolean, IsNotEmpty, IsString } from 'class-validator';

export class ArticleDto {
  @IsString()
  @IsNotEmpty()
  title: string;

  @IsString()
  @IsNotEmpty()
  location: string;

  @IsString()
  @IsNotEmpty()
  tips: string;

  @IsString()
  @IsNotEmpty()
  summaryContent: string;

  @IsString()
  @IsNotEmpty()
  content: string;

  @IsBoolean()
  isHiddenName: boolean;
}

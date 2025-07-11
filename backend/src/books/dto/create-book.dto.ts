import { IsString, IsInt, Min } from 'class-validator';

export class CreateBookDto {
  @IsString()
  title: string;

  @IsString()
  author: string;

  @IsInt()
  @Min(0)
  year: number;

  @IsString()
  genre: string;
}

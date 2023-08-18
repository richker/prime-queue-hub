import { IsInt, IsPositive } from 'class-validator';

export class JobDto {
  @IsInt()
  @IsPositive()
  n: number;
}

import { IsInt, IsString } from 'class-validator';

export class ChallengeDto {
  @IsInt()
  ownerId: number;

  @IsString()
  title: string;

  @IsString()
  description: string;
}

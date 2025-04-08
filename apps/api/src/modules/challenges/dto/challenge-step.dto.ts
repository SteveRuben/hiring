import { IsNotEmpty, IsString } from 'class-validator';

export class ChallengeStepDto {
  // @IsInt()
  // @IsNotEmpty()
  // challengeId: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}

import { IsInt, IsNotEmpty, IsString } from 'class-validator';

export class CreateChallengeStepDto {
  @IsInt()
  @IsNotEmpty()
  challengeId: number;

  @IsString()
  @IsNotEmpty()
  description: string;
}

export class UpdateChallengeStepDto {
  @IsString()
  @IsNotEmpty()
  description: string;
}

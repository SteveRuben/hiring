import { IsInt, IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class ChallengeTestCaseDto {
  @IsString()
  @IsNotEmpty()
  inputData: string;

  @IsString()
  @IsNotEmpty()
  expectedOutput: string;

  @IsInt()
  @IsOptional()
  score?: number;

  @IsString()
  @IsOptional()
  description?: string;
}

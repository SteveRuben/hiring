import { IsInt, IsOptional, IsString } from 'class-validator';

export class ChallengeTestCaseDto {
  @IsString()
  inputData: string;

  @IsString()
  expectedOutput: string;

  @IsInt()
  @IsOptional()
  score?: number;

  @IsString()
  @IsOptional()
  description?: string;
}

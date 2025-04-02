import { PartialType } from '@nestjs/mapped-types';
import { IsInt, IsOptional, IsString } from 'class-validator';

export class CreateChallengeTestCaseDto {
  @IsInt()
  stepId: number;

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

export class UpdateChallengeTestCaseDto extends PartialType(
  CreateChallengeTestCaseDto,
) {}

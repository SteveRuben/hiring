import { Type } from 'class-transformer';
import {
  ArrayMinSize,
  ArrayNotEmpty,
  IsArray,
  IsString,
  ValidateNested,
} from 'class-validator';

class OutputMapping {
  @IsString()
  input: string;

  @IsString()
  output: string;
}

export class CreateSubmissionDto {
  @IsArray()
  @ArrayNotEmpty()
  @ArrayMinSize(1)
  @ValidateNested({ each: true })
  @Type(() => OutputMapping)
  outputUserCode: OutputMapping[];
}

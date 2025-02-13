import { IsOptional, IsEnum, IsString } from 'class-validator';
import { FeeType, DifficultyLevel } from '@prisma/client';

export class FilterMarkedSpotDto {
  @IsOptional()
  @IsEnum(FeeType)
  fee?: FeeType;

  @IsOptional()
  @IsEnum(DifficultyLevel)
  difficulty?: DifficultyLevel;

  @IsOptional()
  @IsString()
  search?: string;
}

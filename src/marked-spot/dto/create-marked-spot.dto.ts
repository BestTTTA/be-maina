// src/marked-spot/dto/create-marked-spot.dto.ts
import { Type } from 'class-transformer';
import { IsNumber, IsString, IsOptional, IsEnum, IsUUID } from 'class-validator';
import { FeeType, DifficultyLevel, BaitType, EffectivenessLevel } from '@prisma/client';

export class CreateMarkedSpotDto {
  // Spot data
  @Type(() => Number)
  @IsNumber()
  lat: number;

  @Type(() => Number)
  @IsNumber()
  lng: number;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @IsEnum(FeeType)
  fee: FeeType;

  @IsEnum(DifficultyLevel)
  difficulty: DifficultyLevel;

  @IsUUID()
  userId: string;

  @IsString()
  fishName: string;

  // Bait information
  @IsEnum(BaitType)
  baitType: BaitType;

  @IsString()
  baitBrand: string;

  @IsEnum(EffectivenessLevel)
  baitEffectiveness: EffectivenessLevel;
}

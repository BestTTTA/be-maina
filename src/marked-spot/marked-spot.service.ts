import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma/prisma.service';
import { CreateMarkedSpotDto } from './dto/create-marked-spot.dto';
import { MinioService } from '../minio/minio.service';
import { FilterMarkedSpotDto } from './dto/filter-marked-spot.dto';

@Injectable()
export class MarkedSpotService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly minioService: MinioService,
  ) {}
//   /**
//    * Creates a full MarkedSpot record with nested SpotImage, Catch (with CatchImage) and Bait.
//    *
//    * @param dto - Data for the marked spot, catch, and bait.
//    * @param spotImageFile - (Optional) File for the spot image.
//    * @param fishImageFile - (Optional) File for the fish (catch) image.
//    * @param baitImageFile - (Optional) File for the bait image.
//    * @returns The created MarkedSpot record.
//    */

  async createMarkedSpot(
    dto: CreateMarkedSpotDto,
    spotImageFile?: Express.Multer.File,
    fishImageFile?: Express.Multer.File,
    baitImageFile?: Express.Multer.File,
  ) {
    // Upload images using MinioService with appropriate prefixes
    const spotImageUrl = spotImageFile
      ? await this.minioService.uploadFile(spotImageFile, 'spot-images')
      : null;
    const fishImageUrl = fishImageFile
      ? await this.minioService.uploadFile(fishImageFile, 'fish-images')
      : null;
    const baitImageUrl = baitImageFile
      ? await this.minioService.uploadFile(baitImageFile, 'bait-images')
      : null;

    // Create the MarkedSpot record using Prisma
    const markedSpot = await this.prisma.markedSpot.create({
      data: {
        lat: dto.lat,
        lng: dto.lng,
        name: dto.name,
        description: dto.description,
        fee: dto.fee,
        difficulty: dto.difficulty,
        user: { connect: { id: dto.userId } },
        // Create a SpotImage if a spot image URL is available.
        spotImages: spotImageUrl
          ? {
              create: [{ url: spotImageUrl }],
            }
          : undefined,
        // Create a Catch record with nested CatchImage and Bait.
        catches: {
          create: {
            fishName: dto.fishName,
            images: fishImageUrl
              ? {
                  create: [{ url: fishImageUrl }],
                }
              : undefined,
            bait: {
              create: {
                type: dto.baitType,
                brand: dto.baitBrand,
                effectiveness: dto.baitEffectiveness,
                imageUrl: baitImageUrl ?? '', 
              },
            },
          },
        },
      },
    });

    return markedSpot;
  }
  
  async getAllMarkedSpots(filterDto: FilterMarkedSpotDto) {
    const { fee, difficulty, search } = filterDto;

    const where: any = {};

    if (fee) {
      where.fee = fee;
    }
    if (difficulty) {
      where.difficulty = difficulty;
    }
    if (search) {
      where.OR = [
        { name: { contains: search, mode: 'insensitive' } },
        { description: { contains: search, mode: 'insensitive' } },
      ];
    }

    return await this.prisma.markedSpot.findMany({
      where,
      include: {
        user: true, 
        spotImages: true,
        catches: {
          include: { images: true, bait: true },
        },
      },
    });
}

}

import { Module } from '@nestjs/common';
import { MarkedSpotController } from './marked-spot.controller';
import { MarkedSpotService } from './marked-spot.service';
import { PrismaService } from '../prisma/prisma.service';

@Module({
  controllers: [MarkedSpotController],
  providers: [MarkedSpotService, PrismaService],
})
export class MarkedSpotModule {}
import {
  Controller,
  Post,
  Body,
  Get,
  Query,
  UseInterceptors,
  UploadedFiles,
  UsePipes,
} from '@nestjs/common';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { MarkedSpotService } from './marked-spot.service';
import { CreateMarkedSpotDto } from './dto/create-marked-spot.dto';
import { FilterMarkedSpotDto } from './dto/filter-marked-spot.dto';
import { FormDataTransformPipe } from 'src/common/pipes/form-data-transform.pipe';

@Controller('marked-spot')
export class MarkedSpotController {
  constructor(private readonly markedSpotService: MarkedSpotService) {}

  @Post()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'spotImage', maxCount: 1 },
      { name: 'fishImage', maxCount: 1 },
      { name: 'baitImage', maxCount: 1 },
    ])
  )
  @UsePipes(FormDataTransformPipe)
  async create(
    @Body() createDto: CreateMarkedSpotDto,
    @UploadedFiles()
    files: {
      spotImage?: Express.Multer.File[];
      fishImage?: Express.Multer.File[];
      baitImage?: Express.Multer.File[];
    },
  ) {
    return await this.markedSpotService.createMarkedSpot(
      createDto,
      files.spotImage ? files.spotImage[0] : undefined,
      files.fishImage ? files.fishImage[0] : undefined,
      files.baitImage ? files.baitImage[0] : undefined,
    );
  }

  @Get()
  async getAll(@Query() filterDto: FilterMarkedSpotDto) {
    return await this.markedSpotService.getAllMarkedSpots(filterDto);
  }
}

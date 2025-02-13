import { Test, TestingModule } from '@nestjs/testing';
import { MarkedSpotController } from './marked-spot.controller';
import { MarkedSpotService } from './marked-spot.service';

describe('MarkedSpotController', () => {
  let controller: MarkedSpotController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [MarkedSpotController],
      providers: [MarkedSpotService],
    }).compile();

    controller = module.get<MarkedSpotController>(MarkedSpotController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});

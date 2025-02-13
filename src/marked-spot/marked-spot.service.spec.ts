import { Test, TestingModule } from '@nestjs/testing';
import { MarkedSpotService } from './marked-spot.service';

describe('MarkedSpotService', () => {
  let service: MarkedSpotService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [MarkedSpotService],
    }).compile();

    service = module.get<MarkedSpotService>(MarkedSpotService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

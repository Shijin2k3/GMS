import { Test, TestingModule } from '@nestjs/testing';
import { JwtRefreshStrategyService } from './jwt-refresh-strategy.service';

describe('JwtRefreshStrategyService', () => {
  let service: JwtRefreshStrategyService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [JwtRefreshStrategyService],
    }).compile();

    service = module.get<JwtRefreshStrategyService>(JwtRefreshStrategyService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});

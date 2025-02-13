import { Controller, Get, Query, ParseIntPipe } from '@nestjs/common';

import { ApiTags, ApiOperation, ApiQuery, ApiResponse } from '@nestjs/swagger';
import { UserRankingService } from './user-ranking.service';
import { ApiResponseDto, UserRankingResponseDto } from './dto/user-ranking.dto';

@ApiTags('User Rankings')
@Controller('rankings')
export class UserRankingController {
  constructor(private readonly userRankingService: UserRankingService) {}

  @Get()
  @ApiOperation({ summary: 'Get all user rankings' })
  @ApiResponse({
    status: 200,
    description: 'Returns all users ranked by number of marked spots',
    type: ApiResponseDto,
  })
  async getAllRankings(): Promise<ApiResponseDto<UserRankingResponseDto[]>> {
    const rankings = await this.userRankingService.getUserRankings();
    return {
      success: true,
      data: rankings,
      meta: {
        total: rankings.length,
        timestamp: new Date().toISOString()
      }
    };
  }

  @Get('top')
  @ApiOperation({ summary: 'Get top ranked users' })
  @ApiQuery({ name: 'limit', required: false, type: Number })
  @ApiResponse({
    status: 200,
    description: 'Returns top ranked users by number of marked spots',
    type: ApiResponseDto,
  })
  async getTopRankings(
    @Query('limit', new ParseIntPipe({ optional: true })) limit?: number,
  ): Promise<ApiResponseDto<UserRankingResponseDto[]>> {
    const rankings = await this.userRankingService.getTopRankedUsers(limit);
    return {
      success: true,
      data: rankings,
      meta: {
        total: rankings.length,
        limit: limit,
        timestamp: new Date().toISOString()
      }
    };
  }
}
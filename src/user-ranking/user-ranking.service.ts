import { Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { UserRankingResponseDto } from './dto/user-ranking.dto';

@Injectable()
export class UserRankingService {
  constructor(private prisma: PrismaService) {}

  async getUserRankings(): Promise<UserRankingResponseDto[]> {
    const usersWithSpotCount = await this.prisma.user.findMany({
      select: {
        id: true,
        name: true,
        email: true,
        avatar: true,
        _count: {
          select: {
            markedSpots: true,
          },
        },
      },
      orderBy: {
        markedSpots: {
          _count: 'desc',
        },
      },
    });

    return usersWithSpotCount.map((user, index) => ({
      id: user.id,
      name: user.name || 'Anonymous',
      email: user.email,
      avatar: user.avatar || '',
      markedSpotsCount: user._count.markedSpots,
      rank: index + 1,
    }));
  }

  async getTopRankedUsers(limit: number = 10): Promise<UserRankingResponseDto[]> {
    const rankings = await this.getUserRankings();
    return rankings.slice(0, limit);
  }
}
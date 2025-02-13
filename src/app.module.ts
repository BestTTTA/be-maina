import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';

import minioConfig from './config/minio.config';
import { PrismaModule } from './prisma/prisma.module';
import { MinioModule } from './minio/minio.module';
import { AuthModule } from './auth/auth.module';
import { MarkedSpotService } from './marked-spot/marked-spot.service';
import { MarkedSpotModule } from './marked-spot/marked-spot.module';
import { UserRankingModule } from './user-ranking/user-ranking.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [minioConfig],
      isGlobal: true,
    }),
    PrismaModule,
    MinioModule,
    AuthModule,
    MarkedSpotModule,
    UserRankingModule
  ],
  providers: [MarkedSpotService],
})
export class AppModule {}
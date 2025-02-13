import { Injectable, InternalServerErrorException } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import * as MinioClient from 'minio';

@Injectable()
export class MinioService {
  private minioClient: MinioClient.Client;
  private readonly bucket: string;

  constructor(private configService: ConfigService) {
    const endPoint = this.configService.get<string>('minio.endPoint');
    const port = this.configService.get<number>('minio.port');
    const useSSL = this.configService.get<boolean>('minio.useSSL');
    const accessKey = this.configService.get<string>('minio.accessKey');
    const secretKey = this.configService.get<string>('minio.secretKey');

    if (!endPoint || !accessKey || !secretKey) {
      throw new InternalServerErrorException('MinIO configuration is missing');
    }

    this.minioClient = new MinioClient.Client({
      endPoint,
      port,
      useSSL,
      accessKey,
      secretKey,
    });

    this.bucket = this.configService.get<string>('minio.bucket') || 'fishing-spots';
  }

  async uploadFile(file: Express.Multer.File, prefix: string): Promise<string> {
    const filename = `${prefix}/${Date.now()}-${file.originalname}`;
    
    await this.minioClient.putObject(
      this.bucket,
      filename,
      file.buffer,
      file.size,
      { 'Content-Type': file.mimetype }  // Fix: Pass proper metadata object
    );

    return filename;
  }
}
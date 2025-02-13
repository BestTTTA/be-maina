import { registerAs } from '@nestjs/config';

export default registerAs('minio', () => ({
  endPoint: process.env.MINIO_ENDPOINT || 'localhost',
  port: parseInt(process.env.MINIO_PORT || '9000', 10),
  useSSL: process.env.MINIO_USE_SSL === 'true',
  accessKey: process.env.MINIO_ACCESS_KEY || '',  // Add default empty string
  secretKey: process.env.MINIO_SECRET_KEY || '',  // Add default empty string
  bucket: process.env.MINIO_BUCKET || 'fishing-spots',
}));
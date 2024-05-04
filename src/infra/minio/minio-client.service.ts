import { Injectable } from '@nestjs/common';
import { Client } from 'minio';

@Injectable()
export class MinioService {
  async getClient(): Promise<Client> {
    if (
      !process.env.MINIO_ENDPOINT ||
      !process.env.MINIO_PORT ||
      !process.env.MINIO_ACCESS_KEY ||
      !process.env.MINIO_SECRET_KEY ||
      !process.env.MINIO_BUCKET
    ) {
      throw new Error('Missing Minio configuration in environment variables');
    }

    return new Client({
      endPoint: process.env.MINIO_ENDPOINT,
      port: parseInt(process.env.MINIO_PORT),
      useSSL: !!parseInt(process.env.MINIO_USE_SSL),
      accessKey: process.env.MINIO_ACCESS_KEY,
      secretKey: process.env.MINIO_SECRET_KEY,
    });
  }

  async addFile(
    filePath: string,
    file: Buffer,
    contentType: string,
  ): Promise<string> {
    const client = await this.getClient();

    // const metadata = {
    //   'Content-Type': contentType,
    // };

    try {
      await client.putObject(
        process.env.MINIO_BUCKET,
        filePath,
        file,
        file.length,
        {
          'Content-Type': contentType,
        },
      );
    } catch (error) {
      throw new Error(
        `Failed to put object in bucket: ${(error as Error).message}`,
      );
    }

    let presignedUrl;
    try {
      presignedUrl = await client.presignedGetObject(
        process.env.MINIO_BUCKET,
        filePath,
      );
    } catch (error) {
      throw new Error(
        `Failed to get presigned URL: ${(error as Error).message}`,
      );
    }

    return presignedUrl;
  }

  async getUrl(filePath: string): Promise<string> {
    const client = await this.getClient();

    try {
      const presignedUrl = await client.presignedGetObject(
        process.env.MINIO_BUCKET,
        filePath,
      );
      return presignedUrl;
    } catch (error) {
      throw new Error(
        `Failed to get presigned URL: ${(error as Error).message}`,
      );
    }
  }
}

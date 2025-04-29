import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { PrismaClient } from '@prisma/client';

@Injectable()
export class PrismaService extends PrismaClient {
  constructor(config: ConfigService) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-call
    super({
      datasources: {
        // eslint-disable-next-line @typescript-eslint/no-unsafe-assignment
        db: { url: config.get('DATABASE_URL') },
      },
    });
  }
}

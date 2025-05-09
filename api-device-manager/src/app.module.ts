import { Module } from '@nestjs/common';
import { CategoryModule } from './category/category.module';
import { DeviceModule } from './device/device.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';

@Module({
  imports: [
    CategoryModule,
    DeviceModule,
    PrismaModule,
    ConfigModule.forRoot({
      isGlobal: true,
    }),
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}

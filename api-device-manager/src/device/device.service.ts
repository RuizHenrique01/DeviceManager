import { Injectable, NotFoundException } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateDeviceDto } from './dto/create-device.dto';

@Injectable()
export class DeviceService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateDeviceDto) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: data.categoryId,
      },
    });

    if (!category)
      throw new NotFoundException('Category with this Id was not found.');

    const device = await this.prisma.device.create({
      data: {
        partNumber: data.partNumber,
        color: data.color,
        categoryId: data.categoryId,
      },
    });

    return device;
  }

  findAll() {
    return this.prisma.device.findMany();
  }

  async findOneById(id: number) {
    const device = await this.prisma.device.findUnique({
      where: {
        id: id,
      },
    });

    if (!device)
      throw new NotFoundException('Device with this Id was not found.');

    return device;
  }

  async delete(id: number) {
    await this.findOneById(id);
    return await this.prisma.device.delete({
      where: {
        id: id,
      },
    });
  }
}

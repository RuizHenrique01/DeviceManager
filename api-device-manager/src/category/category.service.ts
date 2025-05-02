import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library';

@Injectable()
export class CategoryService {
  constructor(private prisma: PrismaService) {}

  async create(data: CreateCategoryDto) {
    const nameExists = await this.prisma.category.findUnique({
      where: {
        name: data.name,
      },
    });

    if (nameExists)
      throw new BadRequestException('This name is already in use.');

    const createdCategory = await this.prisma.category.create({
      data: {
        name: data.name,
      },
    });

    return createdCategory;
  }

  findAll() {
    return this.prisma.category.findMany();
  }

  async findOneById(id: number) {
    const category = await this.prisma.category.findUnique({
      where: {
        id: id,
      },
    });

    if (!category)
      throw new NotFoundException('Category with this Id was not found.');

    return category;
  }

  async delete(id: number) {
    await this.findOneById(id);
    try {
      return await this.prisma.category.delete({
        where: {
          id: id,
        },
      });
    } catch (error) {
      if (error instanceof PrismaClientKnownRequestError) {
        if (error.code === 'P2003') {
          throw new BadRequestException(
            'This category is associated with one or more devices. Please remove the linked devices before deleting the category.',
          );
        }

        throw error;
      }
    }
  }
}

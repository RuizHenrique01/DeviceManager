import { Test, TestingModule } from '@nestjs/testing';
import { CategoryService } from '../category.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { BadRequestException, NotFoundException } from '@nestjs/common';

describe('CategoryService', () => {
  let service: CategoryService;
  let prisma: PrismaService;

  const mockPrismaService = {
    category: {
      findUnique: jest.fn(),
      create: jest.fn(),
      findMany: jest.fn(),
      delete: jest.fn(),
    },
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        CategoryService,
        { provide: PrismaService, useValue: mockPrismaService },
      ],
    }).compile();

    service = module.get<CategoryService>(CategoryService);
    prisma = module.get<PrismaService>(PrismaService);
  });

  afterEach(() => {
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a category if name does not exist', async () => {
      const dto = { name: 'NewCategory' };
      mockPrismaService.category.findUnique.mockResolvedValue(null);
      mockPrismaService.category.create.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);
      expect(result).toEqual({ id: 1, name: 'NewCategory' });
      expect(prisma.category.create).toHaveBeenCalledWith({ data: dto });
    });

    it('should throw BadRequestException if name already exists', async () => {
      const dto = { name: 'ExistingCategory' };
      mockPrismaService.category.findUnique.mockResolvedValue(dto);

      await expect(service.create(dto)).rejects.toThrow(BadRequestException);
    });
  });

  describe('findAll', () => {
    it('should return all categories', async () => {
      const mockCategories = [{ id: 1, name: 'Test' }];
      mockPrismaService.category.findMany.mockResolvedValue(mockCategories);

      const result = await service.findAll();
      expect(result).toEqual(mockCategories);
    });
  });

  describe('findOneById', () => {
    it('should return a category if it exists', async () => {
      const category = { id: 1, name: 'Test' };
      mockPrismaService.category.findUnique.mockResolvedValue(category);

      const result = await service.findOneById(1);
      expect(result).toEqual(category);
    });

    it('should throw NotFoundException if category does not exist', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(null);

      await expect(service.findOneById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete a category if it exists', async () => {
      const category = { id: 1, name: 'ToDelete' };
      mockPrismaService.category.findUnique.mockResolvedValue(category);
      mockPrismaService.category.delete.mockResolvedValue(category);

      const result = await service.delete(1);
      expect(result).toEqual(category);
      expect(prisma.category.delete).toHaveBeenCalledWith({ where: { id: 1 } });
    });

    it('should throw NotFoundException if category does not exist', async () => {
      mockPrismaService.category.findUnique.mockResolvedValue(null);

      await expect(service.delete(1)).rejects.toThrow(NotFoundException);
    });
  });
});

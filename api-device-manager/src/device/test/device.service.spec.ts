import { Test, TestingModule } from '@nestjs/testing';
import { DeviceService } from '../device.service';
import { PrismaService } from 'src/prisma/prisma.service';
import { NotFoundException } from '@nestjs/common';

const mockPrisma = {
  category: {
    findUnique: jest.fn(),
  },
  device: {
    create: jest.fn(),
    findMany: jest.fn(),
    findUnique: jest.fn(),
    delete: jest.fn(),
  },
};

describe('DeviceService', () => {
  let service: DeviceService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        DeviceService,
        { provide: PrismaService, useValue: mockPrisma },
      ],
    }).compile();

    service = module.get<DeviceService>(DeviceService);
    jest.clearAllMocks();
  });

  describe('create', () => {
    it('should create a device when category exists', async () => {
      const dto = {
        partNumber: 1234,
        color: 'Red',
        categoryId: 1,
      };

      mockPrisma.category.findUnique.mockResolvedValue({ id: 1 });
      mockPrisma.device.create.mockResolvedValue({ id: 1, ...dto });

      const result = await service.create(dto);

      expect(mockPrisma.category.findUnique).toHaveBeenCalledWith({
        where: { id: dto.categoryId },
      });
      expect(mockPrisma.device.create).toHaveBeenCalledWith({
        data: dto,
      });
      expect(result).toEqual({ id: 1, ...dto });
    });

    it('should throw if category does not exist', async () => {
      mockPrisma.category.findUnique.mockResolvedValue(null);

      await expect(
        service.create({
          partNumber: 1234,
          color: 'Red',
          categoryId: 999,
        }),
      ).rejects.toThrow(NotFoundException);
    });
  });

  describe('findAll', () => {
    it('should return all devices', async () => {
      const devices = [{ id: 1 }, { id: 2 }];
      mockPrisma.device.findMany.mockResolvedValue(devices);

      const result = await service.findAll();
      expect(result).toEqual(devices);
    });
  });

  describe('findOneById', () => {
    it('should return the device if found', async () => {
      const device = { id: 1, partNumber: 1234 };
      mockPrisma.device.findUnique.mockResolvedValue(device);

      const result = await service.findOneById(1);
      expect(result).toEqual(device);
    });

    it('should throw if the device is not found', async () => {
      mockPrisma.device.findUnique.mockResolvedValue(null);

      await expect(service.findOneById(999)).rejects.toThrow(NotFoundException);
    });
  });

  describe('delete', () => {
    it('should delete the device after checking if it exists', async () => {
      const device = { id: 1 };
      mockPrisma.device.findUnique.mockResolvedValue(device);
      mockPrisma.device.delete.mockResolvedValue(device);

      const result = await service.delete(1);

      expect(mockPrisma.device.findUnique).toHaveBeenCalledWith({
        where: { id: 1 },
        include: { category: true },
      });
      expect(mockPrisma.device.delete).toHaveBeenCalledWith({
        where: { id: 1 },
      });
      expect(result).toEqual(device);
    });

    it('should throw if the device does not exist', async () => {
      mockPrisma.device.findUnique.mockResolvedValue(null);

      await expect(service.delete(999)).rejects.toThrow(NotFoundException);
    });
  });
});

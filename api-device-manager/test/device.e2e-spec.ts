import { Test, TestingModule } from '@nestjs/testing';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { DeviceService } from '../src/device/device.service';

describe('DeviceController (e2e)', () => {
  let app: INestApplication;

  const mockDeviceService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(DeviceService)
      .useValue(mockDeviceService)
      .compile();

    app = moduleFixture.createNestApplication();
    app.useGlobalPipes(
      new ValidationPipe({ whitelist: true, forbidNonWhitelisted: true }),
    );
    await app.init();
  });

  afterAll(async () => {
    await app.close();
  });

  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('/device (POST)', () => {
    it('should create a device with valid data', async () => {
      const mockDevice = {
        id: 1,
        color: 'Red',
        partNumber: 123,
        categoryId: 5,
      };
      mockDeviceService.create.mockResolvedValue(mockDevice);

      const response = await request(app.getHttpServer())
        .post('/device')
        .send({ color: 'Red', partNumber: 123, categoryId: 5 })
        .expect(201);

      expect(response.body).toEqual(mockDevice);
      expect(mockDeviceService.create).toHaveBeenCalledWith({
        color: 'Red',
        partNumber: 123,
        categoryId: 5,
      });
    });

    it('should return 400 if color is empty', async () => {
      const response = await request(app.getHttpServer())
        .post('/device')
        .send({ color: '', partNumber: 123, categoryId: 5 })
        .expect(400);

      expect(response.body.message).toContain('color should not be empty');
    });

    it('should return 400 if color contains non-letters', async () => {
      const response = await request(app.getHttpServer())
        .post('/device')
        .send({ color: 'Red123', partNumber: 123, categoryId: 5 })
        .expect(400);

      expect(response.body.message).toContain(
        'color must contain only letters (a-zA-Z)',
      );
    });

    it('should return 400 if partNumber is negative', async () => {
      const response = await request(app.getHttpServer())
        .post('/device')
        .send({ color: 'Blue', partNumber: -10, categoryId: 5 })
        .expect(400);

      expect(response.body.message).toContain(
        'partNumber must be a positive number',
      );
    });
  });

  describe('/device (GET)', () => {
    it('should return all devices', async () => {
      const mockDevices = [
        { id: 1, color: 'Red', partNumber: 123, categoryId: 5 },
        { id: 2, color: 'Blue', partNumber: 456, categoryId: 6 },
      ];
      mockDeviceService.findAll.mockResolvedValue(mockDevices);

      const response = await request(app.getHttpServer())
        .get('/device')
        .expect(200);

      expect(response.body).toEqual(mockDevices);
    });
  });

  describe('/device/:id (GET)', () => {
    it('should return a device by ID', async () => {
      const mockDevice = {
        id: 1,
        color: 'Red',
        partNumber: 123,
        categoryId: 5,
      };
      mockDeviceService.findOneById.mockResolvedValue(mockDevice);

      const response = await request(app.getHttpServer())
        .get('/device/1')
        .expect(200);

      expect(response.body).toEqual(mockDevice);
      expect(mockDeviceService.findOneById).toHaveBeenCalledWith(1);
    });

    it('should return 400 if ID is not a number', async () => {
      await request(app.getHttpServer()).get('/device/abc').expect(400);
    });
  });

  describe('/device/:id (DELETE)', () => {
    it('should delete a device by ID', async () => {
      mockDeviceService.delete.mockResolvedValue({
        id: 1,
        color: 'Red',
        partNumber: 123,
        categoryId: 5,
      });

      const response = await request(app.getHttpServer())
        .delete('/device/1')
        .expect(200);

      expect(response.body).toHaveProperty('id', 1);
      expect(mockDeviceService.delete).toHaveBeenCalledWith(1);
    });
  });
});

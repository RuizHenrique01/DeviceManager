import { Test, TestingModule } from '@nestjs/testing';
import {
  INestApplication,
  NotFoundException,
  ValidationPipe,
} from '@nestjs/common';
import * as request from 'supertest';
import { AppModule } from '../src/app.module';
import { CategoryService } from '../src/category/category.service';

describe('CategoryController (e2e)', () => {
  let app: INestApplication;

  const mockCategoryService = {
    create: jest.fn(),
    findAll: jest.fn(),
    findOneById: jest.fn(),
    delete: jest.fn(),
  };

  beforeAll(async () => {
    const moduleFixture: TestingModule = await Test.createTestingModule({
      imports: [AppModule],
    })
      .overrideProvider(CategoryService)
      .useValue(mockCategoryService)
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

  describe('/category (POST)', () => {
    it('should create a category with valid data', async () => {
      const mockCategory = { id: 1, name: 'Books' };
      mockCategoryService.create.mockResolvedValue(mockCategory);

      const response = await request(app.getHttpServer())
        .post('/category')
        .send({ name: 'Books' })
        .expect(201);

      expect(response.body).toEqual(mockCategory);
      expect(mockCategoryService.create).toHaveBeenCalledWith({
        name: 'Books',
      });
    });

    it('should fail to create a category with an empty name', async () => {
      const response = await request(app.getHttpServer())
        .post('/category')
        .send({ name: '' })
        .expect(400);

      expect(response.body.message).toContain('name should not be empty');
    });

    it('should fail to create a category with a name longer than 128 characters', async () => {
      const longName = 'a'.repeat(129);

      const response = await request(app.getHttpServer())
        .post('/category')
        .send({ name: longName })
        .expect(400);

      expect(response.body.message).toContain(
        'name must be shorter than or equal to 128 characters',
      );
    });
  });

  describe('/category (GET)', () => {
    it('should return all categories', async () => {
      const mockCategories = [{ id: 1, name: 'Books' }];
      mockCategoryService.findAll.mockResolvedValue(mockCategories);

      const response = await request(app.getHttpServer())
        .get('/category')
        .expect(200);

      expect(response.body).toEqual(mockCategories);
    });
  });

  describe('/category/:id (GET)', () => {
    it('should return a category by Id', async () => {
      const categoryId = 1;
      const mockCategory = { id: categoryId, name: 'Electronics' };
      mockCategoryService.findOneById.mockResolvedValue(mockCategory);

      const response = await request(app.getHttpServer())
        .get(`/category/${categoryId}`)
        .expect(200);

      expect(response.body).toEqual(mockCategory);
      expect(mockCategoryService.findOneById).toHaveBeenCalledWith(categoryId);
    });

    it('should return 400 if Id is not a number', async () => {
      await request(app.getHttpServer()).get('/category/abc').expect(400);
    });

    it('should return 404 if the Id is not found', async () => {
      mockCategoryService.findOneById.mockRejectedValue(
        new NotFoundException('Category with this Id was not found.'),
      );
      await request(app.getHttpServer()).get('/category/999').expect(404);
    });
  });

  describe('/category/:id (DELETE)', () => {
    it('should delete a category by Id', async () => {
      const categoryId = 1;
      mockCategoryService.delete.mockResolvedValue({
        id: categoryId,
        name: 'To Delete',
      });

      const response = await request(app.getHttpServer())
        .delete(`/category/${categoryId}`)
        .expect(200);

      expect(response.body).toHaveProperty('id', categoryId);
      expect(mockCategoryService.delete).toHaveBeenCalledWith(categoryId);
    });
  });
});

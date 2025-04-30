import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Post,
} from '@nestjs/common';
import { CategoryService } from './category.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { ApiOperation } from '@nestjs/swagger';

@Controller('category')
export class CategoryController {
  constructor(private categoryService: CategoryService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new category',
    description: 'Creates a new category.',
  })
  create(@Body() data: CreateCategoryDto) {
    return this.categoryService.create(data);
  }

  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List all categories',
    description: 'Returns a list of all categories in the system.',
  })
  findAll() {
    return this.categoryService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get category by Id',
    description: 'Fetches a single category by its unique Id.',
  })
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.findOneById(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete category by Id',
    description: 'Deletes the category with the specified Id.',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.categoryService.delete(id);
  }
}

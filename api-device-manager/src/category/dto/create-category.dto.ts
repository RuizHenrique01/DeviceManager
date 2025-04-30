import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @ApiProperty({
    type: 'string',
    maxLength: 128,
    nullable: false,
    description: 'Category name',
  })
  name: string;
}

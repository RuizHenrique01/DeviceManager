import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Matches, MaxLength } from 'class-validator';

export class CreateCategoryDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(128)
  @Matches(/\S/, {
    message: 'name must not be empty or contain only whitespace.',
  })
  @ApiProperty({
    type: 'string',
    maxLength: 128,
    nullable: false,
    description: 'Category name',
  })
  name: string;
}

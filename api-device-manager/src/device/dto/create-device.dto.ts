import { ApiProperty } from '@nestjs/swagger';
import {
  IsString,
  MaxLength,
  IsPositive,
  IsNumber,
  IsInt,
  IsAlpha,
  IsNotEmpty,
} from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @IsNotEmpty()
  @MaxLength(16)
  @IsAlpha()
  @ApiProperty({
    type: 'string',
    maxLength: 16,
    nullable: false,
    description: 'Device color (letters only)',
  })
  color: string;

  @IsInt()
  @IsPositive()
  @ApiProperty({
    type: 'number',
    nullable: false,
    description: 'Device partNumber',
  })
  partNumber: number;

  @IsNumber()
  @ApiProperty({
    type: 'number',
    nullable: false,
    description: 'Device category (positive integer)',
  })
  categoryId: number;
}

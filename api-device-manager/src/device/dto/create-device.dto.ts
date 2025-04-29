import {
  IsString,
  MaxLength,
  IsPositive,
  IsNumber,
  IsInt,
  IsAlpha,
} from 'class-validator';

export class CreateDeviceDto {
  @IsString()
  @MaxLength(16)
  @IsAlpha()
  color: string;

  @IsInt()
  @IsPositive()
  partNumber: number;

  @IsNumber()
  categoryId: number;
}

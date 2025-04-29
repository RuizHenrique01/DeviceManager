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
import { CreateDeviceDto } from './dto/create-device.dto';
import { DeviceService } from './device.service';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  create(@Body() data: CreateDeviceDto) {
    return this.deviceService.create(data);
  }
  @Get('/')
  @HttpCode(HttpStatus.OK)
  findAll() {
    return this.deviceService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.deviceService.findOneById(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deviceService.delete(id);
  }
}

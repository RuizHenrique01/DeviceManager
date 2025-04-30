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
import { ApiOperation } from '@nestjs/swagger';

@Controller('device')
export class DeviceController {
  constructor(private deviceService: DeviceService) {}

  @Post('/')
  @HttpCode(HttpStatus.CREATED)
  @ApiOperation({
    summary: 'Create a new device',
    description: 'Creates a new device.',
  })
  create(@Body() data: CreateDeviceDto) {
    return this.deviceService.create(data);
  }
  @Get('/')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'List all devices',
    description: 'Returns a list of all devices in the system.',
  })
  findAll() {
    return this.deviceService.findAll();
  }

  @Get('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Get device by Id',
    description: 'Fetches a single device by its unique Id.',
  })
  findOneById(@Param('id', ParseIntPipe) id: number) {
    return this.deviceService.findOneById(id);
  }

  @Delete('/:id')
  @HttpCode(HttpStatus.OK)
  @ApiOperation({
    summary: 'Delete device by Id',
    description: 'Deletes the device with the specified Id.',
  })
  delete(@Param('id', ParseIntPipe) id: number) {
    return this.deviceService.delete(id);
  }
}

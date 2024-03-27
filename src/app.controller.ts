import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import {ApiOperation, ApiResponse, ApiTags} from "@nestjs/swagger";

@ApiTags('Statistics')
@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}

  @Get()
  @ApiOperation({summary: 'Return uptime and version'})
  @ApiResponse({status: 200, description: 'Return uptime and version', schema: {example: {uptime: '0', version: '1.0.0'}}})
  @ApiResponse({status: 500, description: 'Internal server error', schema: {example: {statusCode: 500, message: 'Internal server error', error: 'Internal server error'}}})
  home(): { uptime: string; version: string } {
    return this.appService.home();
  }

}

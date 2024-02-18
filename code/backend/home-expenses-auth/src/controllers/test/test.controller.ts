import { Controller, Get } from '@nestjs/common';
import { TestService } from '../../services/test/test.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as console from "console";
import * as process from "process";
import {ConfigService} from "@nestjs/config";

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @ApiOperation({ summary: 'Check Hello endpoint', description: 'Do not need any token for checking test endpoint' })
  @ApiOkResponse({ description: 'Hello check is working properly' })
  @Get('hello')
  getHello(): string {
    return this.testService.getHello();
  }

  @Get('hello-as-json')
  getHelloAsJson(): any {
    return this.testService.getHelloAsJson();
  }
}

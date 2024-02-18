import { Controller, Get } from '@nestjs/common';
import { TestService } from '../../services/test/test.service';
import { ApiOkResponse, ApiOperation, ApiTags } from '@nestjs/swagger';
import * as console from "console";
import * as process from "process";

@ApiTags('Test')
@Controller('test')
export class TestController {
  constructor(private testService: TestService) {}

  @ApiOperation({ summary: 'Check Hello endpoint', description: 'Do not need any token for checking test endpoint' })
  @ApiOkResponse({ description: 'Hello check is working properly' })
  @Get('hello')
  getHello(): string {
    console.log('ups');
    console.log('process.env.port2', process.env.port2);
    console.log('process.env.PORT2', process.env.PORT2);
    return this.testService.getHello();
  }
}

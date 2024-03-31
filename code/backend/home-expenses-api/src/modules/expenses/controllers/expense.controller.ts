/*
 * Author: Vladimir Vysokomornyi
 */

import {
  Body,
  Controller,
  Delete,
  ForbiddenException,
  Get,
  NotFoundException,
  Param,
  Post,
  Request,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AccessTokenGuard } from '../../users/auth/guards/access-token.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { CreateExpenseDto } from '../create.expense.dto';
import { ExpenseDbService } from '../db/expense-db.service';
import { ExpenseV2 } from '../db/expense.entity';
import { EXPENSE_FORBIDDEN_ERROR, EXPENSE_NOT_FOUND_ERROR } from '../expense.constants';
import { TokenService } from '../../../services/token-service/token.service';

@UseGuards(AccessTokenGuard)
@ApiBearerAuth()
@ApiTags('Expense')
@Controller('expense')
export class ExpenseController {
  constructor(private readonly service: ExpenseDbService, private tokenService: TokenService) {}

  @ApiOperation({ summary: 'Find all expenses', description: 'Use access token as Bearer during getting expenses' })
  @ApiOkResponse({ description: 'All expenses are found' })
  @Get('findAll')
  async findAll(): Promise<ExpenseV2[]> {
    return this.service.findAll();
  }

  // @ApiOperation({
  //   summary: 'Find expenses by user email',
  //   description: 'Use access token as Bearer during getting expenses'
  // })
  // @ApiOkResponse({ description: 'All expenses by user email are found' })
  // @Get('findByUserEmail/:email')
  // async findByUserEmail(@Request() req, @Param('email') email: string): Promise<ExpenseV2[]> {
  //   if (!this.tokenService.isValidEmail(email, req.headers.authorization)) {
  //     throw new ForbiddenException(EXPENSE_FORBIDDEN_ERROR);
  //   }
  //   return this.service.findByUserEmail(email);
  // }

  @ApiOperation({
    summary: 'Find expenses by user email',
    description: 'Use access token as Bearer during getting expenses'
  })
  @ApiOkResponse({ description: 'All expenses by user email are found' })
  @Get('findByUser')
  async findByUser(@Request() req): Promise<ExpenseV2[]> {
    const email = req?.user?.email;
    if (!email) {
      throw new ForbiddenException(EXPENSE_FORBIDDEN_ERROR);
    }
    return this.service.findByUserEmail(email);
  }

  @ApiOperation({ summary: 'Create expenseV2', description: 'Use access token as Bearer during creating expenseV2' })
  @ApiCreatedResponse({ description: 'The expenseV2 has been successfully created' })
  @ApiBadRequestResponse({ description: 'The expenseV2 is already registered' })
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Request() req, @Body() dto: CreateExpenseDto): Promise<ExpenseV2> {
    if (!this.tokenService.isValidEmail(dto.email, req.headers.authorization)) {
      throw new ForbiddenException(EXPENSE_FORBIDDEN_ERROR);
    }
    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Delete expenseV2', description: 'Use access token as Bearer during expenseV2 removal' })
  @ApiCreatedResponse({ description: 'The expenseV2 has been successfully created' })
  @ApiBadRequestResponse({ description: 'The expenseV2 is already registered' })
  @Delete('delete/:id')
  async deleteById(@Param('id') id: number): Promise<any> {
    const isExisted = await this.service.findById(id);
    if (!isExisted) {
      throw new NotFoundException(EXPENSE_NOT_FOUND_ERROR);
    }
    return this.service.delete(id);
  }

  @ApiOperation({
    summary: 'Find expenses by user email',
    description: 'Use access token as Bearer during getting expenses'
  })
  @ApiOkResponse({ description: 'All expenses by user email are found' })
  @Get('findByUserEmail/:email')
  async findByUserEmail(@Param('email') email: string): Promise<ExpenseV2[]> {
    return this.service.findByUserEmail(email);
  }
}

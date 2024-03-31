/*
 * Author: Vladimir Vysokomornyi
 */

import {
  BadRequestException,
  Body,
  Controller,
  Delete,
  Get,
  NotFoundException,
  Param,
  Post,
  UseGuards,
  UsePipes,
  ValidationPipe
} from '@nestjs/common';
import { AccessTokenGuard } from '../auth/guards/access-token.guard';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags
} from '@nestjs/swagger';
import { CreateUserDto } from '../create.user.dto';
import { UserDbService } from '../db/user-db.service';
import { User } from '../db/user.entity';
import { ALREADY_REGISTERED_ERROR, USER_NOT_FOUND_ERROR } from '../user.constants';

@ApiBearerAuth()
@ApiTags('User')
@UseGuards(AccessTokenGuard)
@Controller('user')
export class UserController {
  constructor(private readonly service: UserDbService) {}

  @ApiOperation({ summary: 'Find all users', description: 'Use access token as Bearer during getting users' })
  @ApiOkResponse({ description: 'All users are found' })
  @Get('findAll')
  async findAll(): Promise<User[]> {
    return this.service.findAll();
  }

  @ApiOperation({ summary: 'Create user', description: 'Use access token as Bearer during creating user' })
  @ApiCreatedResponse({ description: 'The user has been successfully created' })
  @ApiBadRequestResponse({ description: 'The user is already registered' })
  @Post('create')
  @UsePipes(new ValidationPipe())
  async create(@Body() dto: CreateUserDto): Promise<User> {
    const isExisted = await this.service.findUser(dto.email);
    if (isExisted) {
      throw new BadRequestException(ALREADY_REGISTERED_ERROR);
    }

    return this.service.create(dto);
  }

  @ApiOperation({ summary: 'Delete user', description: 'Use access token as Bearer during user removal' })
  @ApiCreatedResponse({ description: 'The user has been successfully created' })
  @ApiBadRequestResponse({ description: 'The user is already registered' })
  @Delete('delete/:email')
  async deleteByEmail(@Param('email') email: string): Promise<any> {
    const isExisted = await this.service.findUser(email);
    if (!isExisted) {
      throw new NotFoundException(USER_NOT_FOUND_ERROR);
    }
    return this.service.delete(email);
  }
}

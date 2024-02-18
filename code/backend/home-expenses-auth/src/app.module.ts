/*
 * Author: Vladimir Vysokomornyi
 */

import { Module } from '@nestjs/common';
import { DatabaseModule } from './modules/database/database.module';
import { userProviders } from './modules/database/user/user.provider';
import { mailerOptions } from './config/mail';
import { MailerModule } from '@nestjs-modules/mailer';
import { TestService } from './services/test/test.service';
import { UserDbService } from './modules/database/user/service/user-db.service';
import { TestController } from './controllers/test/test.controller';
import { UserController } from './controllers/user/user.controller';

import { AuthModule } from './modules/auth/auth.module';
import { expenseProviders } from './modules/database/expense/expense.provider';
import { ExpenseController } from './controllers/expense/expense.controller';
import { ExpenseDbService } from './modules/database/expense/service/expense-db.service';
import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import * as Joi from 'joi';
import { databaseProviders } from './modules/database/database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { User } from './modules/database/user/entity/user';
import { ExpenseV2 } from './modules/database/expense/entity/expense';
import { UsersModule } from './modules/users/users.module';

@Module({
  // imports: [DatabaseModule, MailerModule.forRoot(mailerOptions), AuthModule],
  // controllers: [TestController, UserController, ExpenseController],
  // providers: [UserDbService, ExpenseDbService, ...userProviders, ...expenseProviders, TestService]
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        DB_PORT: Joi.number(),
        DB_HOST: Joi.string(),
        DB_NAME: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string()
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true
      }
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        autoLoadEntities: true,
        // entities: [],
        // entities: [User, ExpenseV2],
        // migrations: [],
        // logging: false,
        // subscribers: [],
        synchronize: false
      })
    }),
    UsersModule
  ],
  controllers: [TestController],
  providers: [TestService]
})
export class AppModule {}

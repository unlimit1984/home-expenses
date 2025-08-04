/*
 * Author: Vladimir Vysokomornyi
 */

import { Module } from '@nestjs/common';
import { TestService } from './services/test/test.service';
import { TestController } from './controllers/test/test.controller';

import { ConfigModule, ConfigService } from '@nestjs/config';
import configuration from './config/configuration';
import * as Joi from 'joi';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UsersModule } from './modules/users/users.module';
import { ExpensesModule } from './modules/expenses/expenses.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      cache: true,
      isGlobal: true,
      load: [configuration],
      validationSchema: Joi.object({
        PORT: Joi.number().default(3000),
        // UI_URL: Joi.string().pattern(new RegExp('^https:\\/\\/unlimit1984\\.github\\.io\\/.*$')),
        UI_URL: Joi.string().pattern(new RegExp('^https:\\/\\/.*$')),
        DB_PORT: Joi.number(),
        DB_HOST: Joi.string(),
        DB_NAME: Joi.string(),
        DB_USERNAME: Joi.string(),
        DB_PASSWORD: Joi.string(),
        MAIL_SMTP_SERVICE: Joi.string(),
        MAIL_USERNAME: Joi.string(),
        MAIL_APP_PASSWORD: Joi.string(),
        AUTH_AT_SECRET: Joi.string(),
        AUTH_RT_SECRET: Joi.string()
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
    UsersModule,
    ExpensesModule
  ],
  controllers: [TestController],
  providers: [TestService]
})
export class AppModule {}

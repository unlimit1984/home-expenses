/*
 * Author: Vladimir Vysokomornyi
 */

import { Module, Logger } from '@nestjs/common';
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
        AUTH_RT_SECRET: Joi.string(),
        MY_TOKEN: Joi.string()
      }),
      validationOptions: {
        allowUnknown: true,
        abortEarly: true
      }
    }),
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => {
        Logger.debug('database.host=' + configService.get<string>('database.host'));
        Logger.debug('database.port=' + configService.get<string>('database.port'));
        Logger.debug('database.name=' + configService.get<string>('database.name'));
        Logger.debug('database.username=' + configService.get<string>('database.username'));
        Logger.debug('database.password=' + configService.get<string>('database.password'));

        Logger.debug('mail.host=' + configService.get<string>('mail.host'));
        Logger.debug('mail.username=' + configService.get<string>('mail.username'));
        Logger.debug('mail.appPassword=' + configService.get<string>('mail.appPassword'));

        Logger.debug('uiUrl=' + configService.get<string>('uiUrl'));

        Logger.debug('auth.at_secret=' + configService.get<string>('auth.at_secret'));
        Logger.debug('auth.rt_secret=' + configService.get<string>('auth.rt_secret'));

        return {
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
        };
      }
    }),
    UsersModule,
    ExpensesModule
  ],
  controllers: [TestController],
  providers: [TestService]
})
export class AppModule {}

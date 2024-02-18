/*
 * Author: Vladimir Vysokomornyi
 */

import { Module } from '@nestjs/common';
import { databaseProviders } from './database.providers';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';
import { User } from './user/entity/user';
import { ExpenseV2 } from './expense/entity/expense';

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      inject: [ConfigService],
      useFactory: async (configService: ConfigService) => ({
        type: 'postgres',
        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        database: configService.get<string>('database.name'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        // entities: [],
        entities: [User, ExpenseV2],
        autoLoadEntities: true,
        // migrations: [],
        // logging: false,
        // subscribers: [],
        synchronize: false
      })
    })
  ],
  // providers: [...databaseProviders],
  // exports: [...databaseProviders]
  // exports: [TypeOrmModule]
})
export class DatabaseModule {}

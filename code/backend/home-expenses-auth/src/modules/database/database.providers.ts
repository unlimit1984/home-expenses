/*
 * Author: Vladimir Vysokomornyi
 */

import { DataSource } from 'typeorm';
import { DATA_SOURCE } from './database.constants';
import { User } from './user/entity/user';
import { DB_HOST, DB_USERNAME, DB_PASSWORD, DB_NAME } from '../../config/db';
import { ExpenseV2 } from './expense/entity/expense';
import {ConfigService} from "@nestjs/config";

export const databaseProviders = [
  {
    provide: DATA_SOURCE,
    useFactory: async (configService: ConfigService) => {
      const dataSource = new DataSource({
        // type: 'mssql',
        type: 'postgres',

        host: configService.get<string>('database.host'),
        port: configService.get<number>('database.port'),
        username: configService.get<string>('database.username'),
        password: configService.get<string>('database.password'),
        database: configService.get<string>('database.host'),
        entities: [User, ExpenseV2],
        migrations: [],
        logging: false,
        subscribers: []
      });

      return dataSource.initialize();
    }
  }
];

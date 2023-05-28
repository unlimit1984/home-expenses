import { DataSource, DataSourceOptions } from 'typeorm';
import { DB_HOST, DB_NAME, DB_PASSWORD, DB_USERNAME } from './src/config/db';

export const datasourceOptions: DataSourceOptions = {
  type: 'mssql',
  host: DB_HOST,
  username: DB_USERNAME,
  password: DB_PASSWORD,
  database: DB_NAME,
  entities: ['dist/src/modules/database/**/entity/*.js'],
  migrations: ['dist/src/migration/*.js']
};
const dataSource = new DataSource(datasourceOptions);
export default dataSource;

import { DataSource, DataSourceOptions } from 'typeorm';

export const datasourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'DB_HOST',
  username: 'DB_USERNAME',
  password: 'DB_PASSWORD',
  database: 'DB_NAME',
  entities: ['dist/modules/expenses/db/*.js', 'dist/modules/users/db/*.js'],
  migrations: ['dist/migration/*.js']
};
const dataSource = new DataSource(datasourceOptions);
export default dataSource;

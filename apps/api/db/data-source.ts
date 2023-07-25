import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'matias',
  password: 'postgres',
  database: 'postgres',
  entities: ['dist/**/*.entity{.ts,.js}'],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

import { Exchange } from 'src/exchange/entities/exchange.entity';
import { Wallet } from 'src/wallets/entities/wallet.entity';
import { DataSource, DataSourceOptions } from 'typeorm';

export const dataSourceOptions: DataSourceOptions = {
  type: 'postgres',
  host: 'localhost',
  port: 5432,
  username: 'matias',
  password: 'postgres',
  database: 'postgres',
  entities: [Wallet, Exchange],
  migrations: ['dist/db/migrations/*{.ts,.js}'],
  synchronize: true,
};

const dataSource = new DataSource(dataSourceOptions);

export default dataSource;

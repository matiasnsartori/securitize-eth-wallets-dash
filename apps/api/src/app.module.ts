import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ExchangeModule } from './exchange/exchange.module';
import { WalletsModule } from './wallets/wallets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { dataSourceOptions } from 'db/data-source';

@Module({
  imports: [
    TypeOrmModule.forRoot(dataSourceOptions),
    ExchangeModule,
    WalletsModule,
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../../', 'client/dist'),
    }),
  ],
})
export class AppModule {
  constructor(private dataSources: DataSource) {}
}


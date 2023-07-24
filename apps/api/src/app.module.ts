import { Module } from '@nestjs/common';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ExchangeModule } from './exchange/exchange.module';
import { WalletsModule } from './wallets/wallets.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DataSource } from 'typeorm';
import { Wallet } from './wallets/entities/wallet.entity';
import { Exchange } from './exchange/entities/exchange.entity';

@Module({
  imports: [
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '../../', 'client/dist'),
    }),
    ExchangeModule,
    WalletsModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5432,
      username: 'matias',
      password: 'postgres',
      database: 'postgres',
      entities: [Wallet, Exchange],
      autoLoadEntities: true,
      synchronize: true,
      retryAttempts: 5,
      retryDelay: 3000,
    }),
  ],
})
// export class AppModule {
//   constructor(private dataSources: DataSource) {}
// }
export class AppModule {
}

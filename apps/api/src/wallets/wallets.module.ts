import { Module } from '@nestjs/common';
import { WalletsService } from './services/wallets.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Wallet } from './entities/wallet.entity';
import { WalletsController } from './controllers/wallets.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Wallet])],
  controllers: [WalletsController],
  providers: [WalletsService]
})
export class WalletsModule {}

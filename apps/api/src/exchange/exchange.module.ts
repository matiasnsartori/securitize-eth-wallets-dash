import { Module } from '@nestjs/common';
import { Exchange } from './entities/exchange.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExchangeService } from './services/exchange.service';
import { ExchangeController } from './controllers/exchange.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Exchange])],
  controllers: [ExchangeController],
  providers: [ExchangeService],
})
export class ExchangeModule {}

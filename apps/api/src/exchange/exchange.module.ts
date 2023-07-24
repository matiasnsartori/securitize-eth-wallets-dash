import { Module } from '@nestjs/common';
import { ExchangeService } from './exchange.service';
import { ExchangeController } from './exchange.controller';
import { Exchange } from './entities/exchange.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Exchange])],
  controllers: [ExchangeController],
  providers: [ExchangeService]
})
export class ExchangeModule {}

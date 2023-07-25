import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ExchangeService } from '../services/exchange.service';
import { CreateExchangeDto } from '../dto/create-exchange.dto';
import { UpdateExchangeDto } from '../dto/update-exchange.dto';

@Controller('exchange')
export class ExchangeController {
  constructor(private readonly exchangeService: ExchangeService) {}

  @Post()
  create(@Body() createExchangeDto: CreateExchangeDto) {
    return this.exchangeService.create(createExchangeDto);
  }

  @Get('rates')
  ethUsd() {
    return this.exchangeService.ethUsdPrice();
  }

  @Get('stored/rates')
  storedPrices() {
    return this.exchangeService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.exchangeService.findOne(+id);
  }

  @Patch()
  update(@Body() updateExchangeDto: UpdateExchangeDto) {
    return this.exchangeService.update(1, updateExchangeDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.exchangeService.remove(+id);
  }
}

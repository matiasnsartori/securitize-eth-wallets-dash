import { Injectable } from '@nestjs/common';
import { CreateExchangeDto } from './dto/create-exchange.dto';
import { UpdateExchangeDto } from './dto/update-exchange.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Exchange } from './entities/exchange.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ExchangeService {
  constructor(
    @InjectRepository(Exchange)
    private exchangeRepository: Repository<Exchange>,
  ) {}
  
  create(createExchangeDto: CreateExchangeDto) {
    return 'This action adds a new exchange';
  }

  findAll() {
    // return this.exchangeRepository.find();
    return `This action returns all exchange`;
  }

  findOne(id: number) {
    return `This action returns a #${id} exchange`;
  }

  update(id: number, updateExchangeDto: UpdateExchangeDto) {
    return `This action updates a #${id} exchange`;
  }

  remove(id: number) {
    return `This action removes a #${id} exchange`;
  }
}

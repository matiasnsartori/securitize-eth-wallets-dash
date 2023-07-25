import { Injectable } from '@nestjs/common';
import { CreateExchangeDto } from '../dto/create-exchange.dto';
import { UpdateExchangeDto } from '../dto/update-exchange.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { etherscanInstance } from 'src/wallets/services/wallets.service';
import { Exchange } from '../entities/exchange.entity';

@Injectable()
export class ExchangeService {
  constructor(
    @InjectRepository(Exchange)
    private exchangeRepository: Repository<Exchange>,
  ) {}

  async create(createExchangeDto: CreateExchangeDto) {
    console.log({ createExchangeDto });
    return await this.exchangeRepository.save(createExchangeDto);
  }

  async ethUsdPrice() {
    const res = await etherscanInstance.get('api', {
      params: {
        module: 'stats',
        action: 'ethprice',
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    });
    return res.data.result.ethusd;
  }

  async findAll() {
    return this.exchangeRepository.find();
  }

  findOne(id: number) {
    return `This action returns a #${id} exchange`;
  }

  update(id: number, updateExchangeDto: UpdateExchangeDto) {
    return this.exchangeRepository.update(id, updateExchangeDto);
  }

  remove(id: number) {
    return `This action removes a #${id} exchange`;
  }
}

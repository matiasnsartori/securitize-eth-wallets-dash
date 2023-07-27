import { Injectable } from '@nestjs/common';
import { CreateExchangeDto } from '../dto/create-exchange.dto';
import { UpdateExchangeDto } from '../dto/update-exchange.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { etherscanInstance } from 'src/wallets/services/wallets.service';
import { Exchange } from '../entities/exchange.entity';
import axios from 'axios';

const exchangeApi = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1/convertcurrency',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});

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

  async getRates() {
    const res = await etherscanInstance.get('api', {
      params: {
        module: 'stats',
        action: 'ethprice',
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    });
    const usdRate = res.data.result.ethusd;

    const euroRes = await exchangeApi.get('/', {
      params: {
        have: 'USD',
        want: 'EUR',
        amount: usdRate,
      },
    });

    const euroRate = euroRes.data.new_amount;

    return {
      usd: +usdRate,
      euro: euroRate,
    };
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

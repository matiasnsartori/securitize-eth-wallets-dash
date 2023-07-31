import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Exchange } from '../entities/exchange.entity';
import axios from 'axios';

const exchangeApi = axios.create({
  baseURL: 'https://api.api-ninjas.com/v1/convertcurrency',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});

export const etherscanInstance = axios.create({
  baseURL: 'https://api.etherscan.io/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});

@Injectable()
export class ExchangeService {
  constructor(
    @InjectRepository(Exchange)
    private exchangeRepository: Repository<Exchange>,
  ) {}

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
}

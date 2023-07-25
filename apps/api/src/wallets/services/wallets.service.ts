import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { Wallet } from '../entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isOldWallet, weiToEth } from './helpers';
import axios from 'axios';

export const etherscanInstance = axios.create({
  baseURL: 'https://api.etherscan.io/',
  timeout: 5000,
  headers: { 'X-Custom-Header': 'foobar' },
});

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    await etherscanInstance
      .get('api', {
        params: {
          module: 'account',
          action: 'txlist',
          address: createWalletDto.address,
          startblock: 0,
          endblock: 99999999,
          sort: 'asc',
          apikey: process.env.ETHERSCAN_API_KEY,
        },
      })
      .then((res) => {
        if (res.data.result.length > 0) {
          const firstTransaction = res.data.result[0].timeStamp;
          createWalletDto.isOld = isOldWallet(firstTransaction);
        }
      });

    return this.walletRepository.save(createWalletDto);
  }

  async getBalance(address: string) {
    console.log({ address });
    const res = await etherscanInstance.get('api', {
      params: {
        module: 'account',
        action: 'balance',
        address,
        tag: 'latest',
        apikey: process.env.ETHERSCAN_API_KEY,
      },
    });
    console.log(res.data.result);
    return weiToEth(res.data.result);
  }

  findAll() {
    return this.walletRepository.find();
  }

  async findOne(id: number) {
    return await this.walletRepository.findOneOrFail({
      where: { id },
    });
  }
  async update(id: number, updateWalletDto: UpdateWalletDto) {
    return this.walletRepository.update(id, updateWalletDto);
  }

  remove(id: number) {
    return this.walletRepository.delete(id);
  }
}

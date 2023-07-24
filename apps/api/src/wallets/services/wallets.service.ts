import { Injectable } from '@nestjs/common';
import { CreateWalletDto } from '../dto/create-wallet.dto';
import { UpdateWalletDto } from '../dto/update-wallet.dto';
import { Wallet } from '../entities/wallet.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { isOldWallet } from './helpers';
import axios from 'axios';

const etherscanInstance = axios.create({
  baseURL: 'https://api.etherscan.io/',
  timeout: 1000,
  headers: {'X-Custom-Header': 'foobar'}
});

@Injectable()
export class WalletsService {
  constructor(
    @InjectRepository(Wallet)
    private walletRepository: Repository<Wallet>,
  ) {}

  async create(createWalletDto: CreateWalletDto) {
    await etherscanInstance.get('api', {
      params: {
        module: 'account',
        action: 'txlist',
        address: createWalletDto.address,
        startblock: 0,
        endblock: 99999999,
        sort: 'asc',
        apikey: process.env.ETHERSCAN_API_KEY,
      }
    }).then((res) => {
      createWalletDto.isOld = isOldWallet(res.data.result[0].timeStamp);
    });

    return this.walletRepository.save(createWalletDto);
  }

  findAll() {
    return this.walletRepository.find();
  }

  async findOne(id: number, ) {
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

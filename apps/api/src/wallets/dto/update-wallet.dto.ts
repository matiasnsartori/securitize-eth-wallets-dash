import { PartialType } from '@nestjs/mapped-types';
import { CreateWalletDto } from './create-wallet.dto';

export class UpdateWalletDto extends PartialType(CreateWalletDto) {
  address?: string;
  name?: string;
  favorite?: boolean;
  balance?: number;
}

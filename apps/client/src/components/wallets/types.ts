export interface IWallet {
  id: number;
  address: string;
  name: string;
  isOld: boolean;
  favorite: boolean;
}

export interface CreateWalletDto {
  address: string;
  name: string;
  favorite: boolean;
}

export interface UpdateWalletDto {
  name?: string;
  favorite?: boolean;
  address?: string;
}

export type TWallets = IWallet[];

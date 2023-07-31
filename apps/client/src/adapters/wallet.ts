import { IWallet } from "../models/wallets";

export const walletAdapter = (wallet: IWallet) => {
  return {
    id: wallet.id,
    address: wallet.address,
    name: wallet.name,
    isOld: wallet.isOld,
    favorite: wallet.favorite,
    balance: wallet.balance,
  };
};

export const walletsAdapter = (wallets: IWallet[]) => {
  return wallets.map((wallet) => walletAdapter(wallet));
};

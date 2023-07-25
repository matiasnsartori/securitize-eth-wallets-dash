import axios from "axios";
import { CreateWalletDto } from "../components/wallets/types";

const walletsApi = axios.create({
  baseURL: "/api/wallets",
});

export const getWallets = async () => {
  const res = await walletsApi.get("/");
  return res.data;
};

export const createWallet = async (wallet: CreateWalletDto) => {
  const res = await walletsApi.post("/", wallet);
  return res.data;
};

export const getBalance = async (address: string) => {
  const res = await walletsApi.get(`/balance/${address}`);
  return res.data;
};

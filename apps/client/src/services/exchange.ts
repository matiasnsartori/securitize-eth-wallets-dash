import axios from "axios";

const exchangeApi = axios.create({
  baseURL: "/api/exchange",
});

const walletsApi = axios.create({
  baseURL: "/api/wallets",
});

export const getRates = async () => {
  const res = await exchangeApi.get(`/rates`);
  console.log(res.data);
  return res.data;
};

export const deleteWallet = async (id: number) => {
  const res = await walletsApi.delete(`/${id}`);
  return res.data;
};

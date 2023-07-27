import axios from "axios";

const exchangeApi = axios.create({
  baseURL: "/api/exchange",
});

export const getUsdRate = async () => {
  const res = await exchangeApi.get(`/rates`);
  return res.data;
};

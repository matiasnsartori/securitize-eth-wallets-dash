import { IRates } from "../models/rates";

export const ratesAdapter = (rates: IRates) => {
  return {
    euro: rates.euro,
    usd: rates.usd,
  };
};

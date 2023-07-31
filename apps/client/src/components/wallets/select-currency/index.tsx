import { FC, useState } from "react";
import { useQuery } from "react-query";
import { getBalance } from "../../../services/wallets";
import { getRates } from "../../../services/exchange";
import { SelectChangeEvent } from "@mui/material";
import WalletBalanceDisplay from "./walletBalanceDisplay";
import EditExchangeRate from "./editExchangeRate";
import { Currency, IWallet } from "../../../models/wallets";
import { IRates } from "../../../models/rates";
import { ratesAdapter } from "../../../adapters/exchange";

interface SelectCurrencyProps {
  wallet: IWallet;
}

const SelectCurrency: FC<SelectCurrencyProps> = ({ wallet }) => {
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [usdRate, setUsdRate] = useState(
    localStorage.getItem("usdUserRate") || 1
  );
  const [euroRate, setEuroRate] = useState(
    localStorage.getItem("euroUserRate") || 1
  );
  const [currency, setCurrency] = useState<Currency>("ETH");
  const [editUserCurrency, setEditUserCurrency] = useState(false);
  const [userRate, setUserRate] = useState(0);

  const { refetch, isLoading } = useQuery(
    `balance-${wallet.id}`,
    () => getBalance(wallet.address),
    { enabled: false }
  );
  const { refetch: rates, isLoading: loadingRates } = useQuery(
    `rates`,
    getRates,
    { enabled: false }
  );

  const handleShowBalance = async () => {
    if (showBalance || balance !== 0) {
      setShowBalance(!showBalance);
    } else {
      const balance = await refetch();
      if (balance.data !== "") {
        setBalance(balance.data[0].balance);

        setShowBalance(true);
      }
    }
  };

  const handleChange = async (event: SelectChangeEvent) => {
    setCurrency(event.target.value as Currency);
    if (event.target.value === "Usd") {
      setExchangeRate(+usdRate);
    }
    if (event.target.value === "Euro") {
      setExchangeRate(+euroRate);
    }
    if (event.target.value === "ETH") {
      setExchangeRate(1);
    }
  };

  const saveUserRates = async () => {
    if (currency === "Usd") {
      localStorage.setItem("usdUserRate", userRate.toString());
      setUsdRate(userRate);
    }
    if (currency === "Euro") {
      localStorage.setItem("euroUserRate", userRate.toString());
      setEuroRate(userRate);
    }
    setExchangeRate(userRate);
    setEditUserCurrency(!editUserCurrency);
  };

  const useActualRates = async () => {
    const exchangeRates: IRates = (await rates()).data;
    const adaptedRates = ratesAdapter(exchangeRates);
    setUsdRate(adaptedRates.usd);
    setEuroRate(adaptedRates.euro);
    if (currency === "Usd") {
      setExchangeRate(adaptedRates.usd);
    }
    if (currency === "Euro") {
      setExchangeRate(adaptedRates.euro);
    }
  };

  const useUserRates = async () => {
    setUsdRate(+localStorage.getItem("usdUserRate")!);
    setEuroRate(+localStorage.getItem("euroUserRate")!);
    if (currency === "Usd") {
      setExchangeRate(+localStorage.getItem("usdUserRate")!);
    }
    if (currency === "Euro") {
      setExchangeRate(+localStorage.getItem("euroUserRate")!);
    }
  };

  return (
    <>
      <EditExchangeRate
        currency={currency}
        usdRate={+usdRate}
        euroRate={+euroRate}
        editUserCurrency={editUserCurrency}
        userRate={userRate}
        onCurrencyChange={handleChange}
        onEditUserCurrency={() => setEditUserCurrency(!editUserCurrency)}
        onSaveUserRates={saveUserRates}
        onUserRateChange={(value) => setUserRate(value)}
        loadingRates={loadingRates}
        walletId={wallet.id}
      />
      <WalletBalanceDisplay
        currency={currency}
        exchangeRate={exchangeRate}
        showBalance={showBalance}
        balance={balance}
        onShowBalance={handleShowBalance}
        handleChange={handleChange}
        useUserRates={useUserRates}
        isLoading={isLoading}
        getCurrentRates={useActualRates}
      />
    </>
  );
};

export default SelectCurrency;

import { FC, useState } from "react";
import { useQuery } from "react-query";
import { getBalance } from "../../../api/wallets";
import { IWallet } from "../types";
import { getUsdRate } from "../../../api/exchange";
import { SelectChangeEvent } from "@mui/material";
import WalletBalanceDisplay from "./walletBalanceDisplay";
import CurrencySelector from "./currencySelector";

interface SelectCurrencyProps {
  wallet: IWallet;
}

const SelectCurrency: FC<SelectCurrencyProps> = ({ wallet }) => {
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [usdRate, setUsdRate] = useState(0);
  const [euroRate, setEuroRate] = useState(0);
  const [currency, setCurrency] = useState<"Usd" | "Euro" | "">("");
  const [editUserCurrency, setEditUserCurrency] = useState(false);
  const [userRate, setUserRate] = useState(0);

  const { refetch } = useQuery(
    `balance-${wallet.id}`,
    () => getBalance(wallet.address),
    { enabled: false }
  );
  const { refetch: rates } = useQuery(`rates`, getUsdRate, { enabled: false });

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
    setCurrency(event.target.value as "Usd" | "Euro" | "");
    if (event.target.value === "Usd") {
      setExchangeRate(usdRate);
    }
    if (event.target.value === "Euro") {
      setExchangeRate(euroRate);
    }
    if (event.target.value === "") {
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
    const exchangeRates = await rates();
    setUsdRate(exchangeRates.data.usd);
    setEuroRate(exchangeRates.data.euro);
    if (currency === "Usd") {
      setExchangeRate(exchangeRates.data.usd);
    }
    if (currency === "Euro") {
      setExchangeRate(exchangeRates.data.euro);
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
      <CurrencySelector
        currency={currency}
        usdRate={usdRate}
        euroRate={euroRate}
        editUserCurrency={editUserCurrency}
        userRate={userRate}
        onCurrencyChange={handleChange}
        onEditUserCurrency={() => setEditUserCurrency(!editUserCurrency)}
        onSaveUserRates={saveUserRates}
        onUserRateChange={(value) => setUserRate(value)}
      />
      <WalletBalanceDisplay
        currency={currency}
        exchangeRate={exchangeRate}
        showBalance={showBalance}
        balance={balance}
        onShowBalance={handleShowBalance}
        handleChange={handleChange}
        useActualRates={useActualRates}
        useUserRates={useUserRates}
      />
    </>
  );
};

export default SelectCurrency;

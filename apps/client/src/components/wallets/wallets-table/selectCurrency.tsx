import { FC, useEffect, useState } from "react";
import {
  Button,
  MenuItem,
  Select,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import { useQuery } from "react-query";
import { getBalance } from "../../../api/wallets";
import { IWallet } from "../types";
import { getUsdRate } from "../../../api/exchange";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import {
  AccountBalance,
  BalanceInfo,
  ButtonsContainer,
  CustomFormControl,
  InfoBox,
  Topbar,
} from "./styled";

interface selectCurrencyProps {
  wallet: IWallet;
}

const SelectCurrency: FC<selectCurrencyProps> = ({ wallet }) => {
  const [showBalance, setShowBalance] = useState(false);
  const [balance, setBalance] = useState(0);
  const [exchangeRate, setExchangeRate] = useState(1);
  const [usdRate, setUsdRate] = useState(0);
  const [euroRate, setEuroRate] = useState(0);
  const [currency, setCurrency] = useState<"Usd" | "Euro" | "">("");
  const [editUserCurrency, setEditUserCurrency] = useState(false);
  const [userRate, setUserRate] = useState(0);

  useEffect(() => {
    if (!!localStorage.getItem("usdUserRate")) {
      setUsdRate(+localStorage.getItem("usdUserRate")!);
    }
    if (!!localStorage.getItem("euroUserRate")) {
      setEuroRate(+localStorage.getItem("euroUserRate")!);
    }
  }, []);

  const { refetch } = useQuery(
    `balance-${wallet.address}`,
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

  return (
    <>
      <InfoBox>
        <Topbar>
          <h3>Edit Echanche Rate</h3>{" "}
          {editUserCurrency ? (
            <>
              <Button
                color="error"
                onClick={() => setEditUserCurrency(!editUserCurrency)}
              >
                <CloseIcon />
              </Button>

              <Button color="success" onClick={() => saveUserRates()}>
                <CheckIcon />
              </Button>
            </>
          ) : (
            <Button onClick={() => setEditUserCurrency(!editUserCurrency)}>
              <ModeEditIcon />
            </Button>
          )}
        </Topbar>
        {editUserCurrency ? (
          <TextField
            id="outlined-basic"
            label={`${currency.toUpperCase()}`}
            variant="outlined"
            onChange={(e) => setUserRate(+e.target.value)}
          />
        ) : (
          <span>
            {`${currency} Rate: ${
              currency === "Usd" ? usdRate : currency === "Euro" ? euroRate : 1
            }`}
          </span>
        )}
      </InfoBox>
      <InfoBox>
        <Topbar>
          <CustomFormControl size="small" sx={{ m: 1, minWidth: 120 }}>
            <Select
              value={currency}
              onChange={handleChange}
              displayEmpty
              inputProps={{ "aria-label": "Without label" }}
              style={{ maxHeight: "31px" }}
            >
              <MenuItem value="">
                <em>Etherium</em>
              </MenuItem>
              <MenuItem value={"Usd"}>USD</MenuItem>
              <MenuItem value={"Euro"}>EURO</MenuItem>
            </Select>
          </CustomFormControl>
          <ButtonsContainer>
            <Button onClick={useActualRates} variant="outlined" size="small">
              Use Actual Rates
            </Button>
            <Button onClick={useUserRates} variant="outlined" size="small">
              Use Custom Rates
            </Button>
          </ButtonsContainer>
        </Topbar>

        <AccountBalance>
          <span>Wallet Balance</span>
          <BalanceInfo>
            <Button variant="outlined" onClick={() => handleShowBalance()}>
              {showBalance ? <VisibilityIcon /> : <VisibilityOffIcon />}
            </Button>

            {showBalance ? (
              <h3>
                {`${exchangeRate === 1 ? "ETH" : currency}: `}
                {(balance * exchangeRate).toFixed(2)}
              </h3>
            ) : (
              <h3>....</h3>
            )}
          </BalanceInfo>
        </AccountBalance>
      </InfoBox>
    </>
  );
};

export default SelectCurrency;

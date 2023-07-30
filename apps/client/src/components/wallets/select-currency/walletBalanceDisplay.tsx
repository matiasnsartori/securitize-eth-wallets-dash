import { FC } from "react";
import {
  Button,
  CircularProgress,
  MenuItem,
  Select,
  SelectChangeEvent,
} from "@mui/material";
import VisibilityOffIcon from "@mui/icons-material/VisibilityOff";
import VisibilityIcon from "@mui/icons-material/Visibility";
import {
  AccountBalance,
  BalanceInfo,
  ButtonsContainer,
  CustomFormControl,
  InfoBox,
  Topbar,
} from "../wallets-table/styled";
import { Currency } from "../types";

interface WalletBalanceDisplayProps {
  currency: Currency;
  exchangeRate: number;
  showBalance: boolean;
  balance: number;
  isLoading: boolean;
  onShowBalance: () => Promise<void>;
  handleChange: (event: SelectChangeEvent) => Promise<void>;
  getCurrentRates: () => Promise<void>;
  useUserRates: () => Promise<void>;
}

const WalletBalanceDisplay: FC<WalletBalanceDisplayProps> = ({
  currency,
  exchangeRate,
  showBalance,
  balance,
  isLoading,
  onShowBalance,
  handleChange,
  getCurrentRates,
  useUserRates,
}) => {
  return (
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
            <MenuItem value="ETH">
              <em>Etherium</em>
            </MenuItem>
            <MenuItem value={"Usd"}>USD</MenuItem>
            <MenuItem value={"Euro"}>EURO</MenuItem>
          </Select>
        </CustomFormControl>
        <ButtonsContainer>
          <Button onClick={getCurrentRates} variant="outlined" size="small">
            Get Current Rates
          </Button>
          <Button onClick={useUserRates} variant="outlined" size="small">
            Use Custom Rates
          </Button>
        </ButtonsContainer>
      </Topbar>

      <AccountBalance>
        <span>Wallet Balance</span>
        <BalanceInfo>
          <Button variant="outlined" onClick={onShowBalance}>
            {showBalance ? <VisibilityIcon /> : <VisibilityOffIcon />}
          </Button>

          {showBalance ? (
            <h3>
              {`${currency}: `}
              {(balance * exchangeRate).toFixed(2)}
            </h3>
          ) : isLoading ? (
            <CircularProgress />
          ) : (
            <h3>********</h3>
          )}
        </BalanceInfo>
      </AccountBalance>
    </InfoBox>
  );
};

export default WalletBalanceDisplay;

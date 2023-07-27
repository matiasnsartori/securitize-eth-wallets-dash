import { FC } from "react";
import { Button, MenuItem, Select, SelectChangeEvent } from "@mui/material";
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

interface WalletBalanceDisplayProps {
  currency: "Usd" | "Euro" | "";
  exchangeRate: number;
  showBalance: boolean;
  balance: number;
  onShowBalance: () => void;
  handleChange: (event: SelectChangeEvent) => Promise<void>;
  useActualRates: () => Promise<void>;
  useUserRates: () => Promise<void>;
}

const WalletBalanceDisplay: FC<WalletBalanceDisplayProps> = ({
  currency,
  exchangeRate,
  showBalance,
  balance,
  onShowBalance,
  handleChange,
  useActualRates,
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
          <Button variant="outlined" onClick={onShowBalance}>
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
  );
};

export default WalletBalanceDisplay;

import { FC } from "react";
import { Button, SelectChangeEvent, TextField } from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { InfoBox, Topbar } from "../wallets-table/styled";

interface CurrencySelectorProps {
  currency: "Usd" | "Euro" | "";
  usdRate: number;
  euroRate: number;
  editUserCurrency: boolean;
  userRate: number;
  onCurrencyChange: (event: SelectChangeEvent) => void;
  onEditUserCurrency: () => void;
  onSaveUserRates: () => void;
  onUserRateChange: (value: number) => void;
}

const CurrencySelector: FC<CurrencySelectorProps> = ({
  currency,
  usdRate,
  euroRate,
  editUserCurrency,
  onEditUserCurrency,
  onSaveUserRates,
  onUserRateChange,
}) => {
  return (
    <InfoBox>
      <Topbar>
        <h3>Edit Exchange Rate</h3>
        {editUserCurrency ? (
          <div>
            <Button color="error" onClick={onEditUserCurrency}>
              <CloseIcon />
            </Button>

            <Button color="success" onClick={onSaveUserRates}>
              <CheckIcon />
            </Button>
          </div>
        ) : (
          <Button onClick={onEditUserCurrency}>
            <ModeEditIcon />
          </Button>
        )}
      </Topbar>
      {editUserCurrency ? (
        <TextField
          id="outlined-basic"
          label={`${currency.toUpperCase()}`}
          variant="outlined"
          onChange={(e) => onUserRateChange(+e.target.value)}
        />
      ) : (
        <div>
          <h3>
            {`${currency} Rate: ${
              currency === "Usd" ? usdRate : currency === "Euro" ? euroRate : 1
            }`}
          </h3>
        </div>
      )}
    </InfoBox>
  );
};

export default CurrencySelector;

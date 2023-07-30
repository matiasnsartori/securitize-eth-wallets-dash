import { FC, useState } from "react";
import {
  Button,
  CircularProgress,
  SelectChangeEvent,
  TextField,
} from "@mui/material";
import ModeEditIcon from "@mui/icons-material/ModeEdit";
import CheckIcon from "@mui/icons-material/Check";
import CloseIcon from "@mui/icons-material/Close";
import { InfoBox, Topbar } from "../wallets-table/styled";
import { Currency } from "../types";
import DeleteWalletModal from "../deleteWalletModal";

interface EditExchangeRateProps {
  currency: Currency;
  usdRate: number;
  euroRate: number;
  editUserCurrency: boolean;
  userRate: number;
  loadingRates: boolean;
  walletId: number;
  onCurrencyChange: (event: SelectChangeEvent) => void;
  onEditUserCurrency: () => void;
  onSaveUserRates: () => void;
  onUserRateChange: (value: number) => void;
}

const EditExchangeRate: FC<EditExchangeRateProps> = ({
  currency,
  usdRate,
  euroRate,
  editUserCurrency,
  loadingRates,
  walletId,
  onEditUserCurrency,
  onSaveUserRates,
  onUserRateChange,
}) => {
  const [openModal, setOpenModal] = useState(false);
  return (
    <InfoBox>
      <Topbar centered>
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
        <>
          <div>
            <h3>
              {loadingRates ? (
                <CircularProgress />
              ) : (
                `${currency} Rate: ${
                  currency === "Usd"
                    ? usdRate
                    : currency === "Euro"
                    ? euroRate
                    : 1
                }`
              )}
            </h3>
          </div>
          <Button
            variant="outlined"
            color="error"
            fullWidth
            onClick={() => setOpenModal(true)}
          >
            Delete Wallet
          </Button>
          <DeleteWalletModal
            setOpenModal={setOpenModal}
            walletId={walletId}
            open={openModal}
          />
        </>
      )}
    </InfoBox>
  );
};

export default EditExchangeRate;

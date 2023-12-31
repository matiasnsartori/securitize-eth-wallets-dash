import { FC } from "react";
import StarIcon from "@mui/icons-material/Star";
import { CustomAlert, ItemContainer, WalletHeader, WalletInfo } from "./styled";
import SelectCurrency from "../select-currency";
import { TWallets } from "../../../models/wallets";

interface walletsTableProps {
  wallets: TWallets;
}

const WalletsTable: FC<walletsTableProps> = ({ wallets }) => {
  return (
    <div>
      {wallets.length > 0 ? (
        wallets.map((wallet) => {
          return (
            <ItemContainer id={wallet.address}>
              {wallet.isOld ? (
                <CustomAlert variant="filled" severity="warning">
                  Wallet is Old!
                </CustomAlert>
              ) : (
                ""
              )}
              <WalletHeader>
                <h2>{wallet.name}</h2>
                {wallet.favorite && <StarIcon color="info" />}
              </WalletHeader>
              <WalletInfo>
                <SelectCurrency wallet={wallet} />
              </WalletInfo>
            </ItemContainer>
          );
        })
      ) : (
        <h1>No Wallets</h1>
      )}
    </div>
  );
};

export default WalletsTable;

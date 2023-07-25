import { FC } from "react";
import { TWallets } from "../types";
import { Alert } from "@mui/material";
import styled from "styled-components";
import { getBalance } from "../../../api/wallets";
import { useQuery } from "react-query";
import ExchangeInfo from "./exchangeInfo";

interface walletsTableProps {
  wallets: TWallets;
}

const ItemContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin-top: 2rem;
  border-bottom: 1px solid #e0e0e0;
  font-family: "Roboto";
`;

const WalletInfo = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const CustomAlert = styled(Alert)`
  margin-bottom: 1rem;
  background-color: #fa8e926c !important;
  color: #580b0b !important;
  border: 1px solid #580b0b65;
`;

const WalletsTable: FC<walletsTableProps> = ({ wallets }) => {
  return (
    <>
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
              <h2>{wallet.name}</h2>
              <WalletInfo>
                <ExchangeInfo wallet={wallet} />
              </WalletInfo>
            </ItemContainer>
          );
        })
      ) : (
        <h1>No Wallets</h1>
      )}
    </>
  );
};

export default WalletsTable;

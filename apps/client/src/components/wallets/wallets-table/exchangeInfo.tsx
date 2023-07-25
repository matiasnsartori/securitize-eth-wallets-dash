import { FC } from "react";
import { IWallet } from "../types";
import styled from "styled-components";
import { useQuery } from "react-query";
import { getBalance } from "../../../api/wallets";

const InfoBox = styled.div`
  width: 48%;
  height: 12rem;
  background-color: #e7e7e75c;
  border-radius: 10px;
  border: 2px solid #8f8e8e1f;
`;

interface exchangeInfoProps {
  wallet?: IWallet;
}

const ExchangeInfo: FC<exchangeInfoProps> = ({ wallet }) => {
  console.log("wallet", wallet);
  const { isLoading, data: balanceData } = useQuery(
    `balance-${wallet!.address}`,
    async () => await getBalance(wallet!.address)
  );

  console.log("balanceData", balanceData);

  return (
    <>
      <InfoBox>
        <h3>Balance</h3>
        <h3>{}</h3>
      </InfoBox>
      <InfoBox>
        <h3>Balance</h3>
        <h3>{}</h3>
      </InfoBox>
    </>
  );
};

export default ExchangeInfo;

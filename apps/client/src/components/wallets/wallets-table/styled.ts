import { Alert, FormControl } from "@mui/material";
import styled from "styled-components";

const InfoBox = styled.div`
  width: 42%;
  height: 10rem;
  background-color: #e7e7e75c;
  border-radius: 10px;
  border: 2px solid #8f8e8e1f;
  padding: 1rem;
`;

const Topbar = styled.div`
  display: flex;
  flex-direction: row;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const ButtonsContainer = styled.div`
  display: flex;

  flex-direction: column;
  white-space: nowrap;
  gap: 5px;
`;

const AccountBalance = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: space-between;
  margin-bottom: 1rem;
`;

const BalanceInfo = styled.div`
  display: flex;
  align-items: center;
  width: 100%;
  justify-content: inherit;
`;

const CustomFormControl = styled(FormControl)`
  margin: 0px !important;
  padding: 0px 10px 0px 0px;
`;

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

const WalletHeader = styled.div`
  display: flex;
  flex-direction: row;
  align-items: center;
  justify-content: space-between;
`;

export {
  InfoBox,
  Topbar,
  ButtonsContainer,
  AccountBalance,
  BalanceInfo,
  CustomFormControl,
  ItemContainer,
  WalletInfo,
  CustomAlert,
  WalletHeader,
};

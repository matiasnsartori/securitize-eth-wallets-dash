import { FC } from "react";

import Addwallet from "./add-wallet";
import { validateAddress } from "./helpers";
import { TWallets } from "./types";
import WalletsTable from "./wallets-table";
import { useQuery, useMutation } from "react-query";
import { createWallet, getWallets } from "../../api/wallets";

interface walletsProps {}

const Wallets: FC<walletsProps> = ({}) => {
  const { isLoading, data: walletsData } = useQuery<TWallets>(
    "wallets",
    getWallets
  );
  const { mutate } = useMutation(createWallet);

  const handleSubmit = async (
    address: string,
    name: string,
    favorite: boolean
  ) => {
    if (!validateAddress(address)) {
      return;
    }
    const data = { address, name, favorite };
    mutate(data);
  };

  return (
    <>
      <Addwallet handleSubmit={handleSubmit} />
      {!isLoading && walletsData ? <WalletsTable wallets={walletsData} /> : ""}
    </>
  );
};

export default Wallets;

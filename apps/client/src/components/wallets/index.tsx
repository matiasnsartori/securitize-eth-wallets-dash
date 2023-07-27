import { FC, useState } from "react";

import Addwallet from "./add-wallet";
import { validateAddress } from "./helpers";
import { TWallets } from "./types";
import WalletsTable from "./wallets-table";
import { useQuery, useMutation } from "react-query";
import { createWallet, getWallets } from "../../api/wallets";
import { Button } from "@mui/material";

interface walletsProps {}

const sortWalletsByFavorite = (wallets: TWallets) => {
  return wallets.sort((a, b) => {
    if (a.favorite && !b.favorite) {
      return -1;
    }
    if (!a.favorite && b.favorite) {
      return 1;
    }
    return 0;
  });
};

const Wallets: FC<walletsProps> = ({}) => {
  const [showSortedWallets, setShowSortedWallets] = useState(false);
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

  if (!isLoading) {
    return (
      <>
        <Addwallet handleSubmit={handleSubmit} />

        {!isLoading && walletsData ? (
          <>
            <Button
              variant="contained"
              onClick={() => setShowSortedWallets(!showSortedWallets!)}
            >
              Sort by favorite
            </Button>
            <WalletsTable
              wallets={
                showSortedWallets
                  ? sortWalletsByFavorite(walletsData)
                  : walletsData
              }
            />
          </>
        ) : (
          ""
        )}
      </>
    );
  }
};

export default Wallets;

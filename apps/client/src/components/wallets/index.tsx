import { FC, useState } from "react";

import Addwallet from "./add-wallet";
import { validateAddress } from "./helpers";
import { TWallets } from "./types";
import WalletsTable from "./wallets-table";
import { useQuery, useMutation } from "react-query";
import { createWallet, getWallets } from "../../api/wallets";
import { Alert, Button, Snackbar } from "@mui/material";
import StarIcon from "@mui/icons-material/Star";
import StarBorderIcon from "@mui/icons-material/StarBorder";

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
  const [open, setOpen] = useState(false);

  const { isLoading, data: walletsData } = useQuery<TWallets>(
    "wallets",
    getWallets
  );

  let { mutate, isSuccess } = useMutation(createWallet);

  const handleSubmit = async (
    address: string,
    name: string,
    favorite: boolean
  ) => {
    if (!validateAddress(address)) {
      return;
    }
    setOpen(true);
    const data = { address, name, favorite };
    mutate(data);
  };

  const onWalletAdded = () => {
    setOpen(false);
    window.location.reload();
  };

  if (!isLoading) {
    return (
      <>
        <Addwallet handleSubmit={handleSubmit} />

        {!isLoading && walletsData ? (
          <>
            <Button
              style={{ marginTop: "1.5rem" }}
              variant="contained"
              onClick={() => setShowSortedWallets(!showSortedWallets!)}
              endIcon={showSortedWallets ? <StarIcon /> : <StarBorderIcon />}
            >
              Sort by favorite
            </Button>

            <Snackbar
              open={isSuccess && open}
              autoHideDuration={2000}
              onClose={onWalletAdded}
              anchorOrigin={{ vertical: "top", horizontal: "center" }}
            >
              <Alert severity="success">Wallet Added!</Alert>
            </Snackbar>

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

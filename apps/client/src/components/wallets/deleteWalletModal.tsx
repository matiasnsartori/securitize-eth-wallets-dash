import { Button, CircularProgress, Modal, Typography } from "@mui/material";
import { FC } from "react";
import CloseIcon from "@mui/icons-material/Close";
import { useMutation } from "react-query";
import { deleteWallet } from "../../api/exchange";
import {
  ModalBody,
  ModalCloseButton,
  ModalCloseButtons,
  ModalContainer,
  OptionButtons,
} from "./wallets-table/styled";
import HighlightOffIcon from "@mui/icons-material/HighlightOff";
import DeleteOutlineIcon from "@mui/icons-material/DeleteOutline";

interface deleteWalletModalProps {
  walletId: number;
  open: boolean;
  setOpenModal: (open: boolean) => void;
}

const DeleteWalletModal: FC<deleteWalletModalProps> = ({
  walletId,
  open,
  setOpenModal,
}) => {
  let { mutate, isSuccess, isLoading } = useMutation(deleteWallet);

  const handleDeleteWallet = async () => {
    mutate(walletId);
    if (isSuccess) {
      setOpenModal(false);
    }
  };

  const handleCloseModal = () => {
    setOpenModal(false);
    window.location.reload();
  };

  return (
    <Modal open={open}>
      <ModalContainer>
        {isLoading ? (
          <CircularProgress />
        ) : (
          <>
            <ModalCloseButton>
              <Button color="inherit" onClick={() => setOpenModal(false)}>
                <CloseIcon />
              </Button>
            </ModalCloseButton>
            {isSuccess ? (
              <ModalBody>
                <DeleteOutlineIcon
                  sx={{ height: "100px", width: "100px" }}
                  color="success"
                />
                <Typography variant="h5" align="center">
                  Wallet deleted successfully
                </Typography>
              </ModalBody>
            ) : (
              <ModalBody>
                <HighlightOffIcon
                  sx={{ height: "100px", width: "100px" }}
                  color="error"
                />
                <Typography variant="h4" align="center">
                  Are you sure ?
                </Typography>
                <Typography
                  color="GrayText"
                  variant="h6"
                  fontWeight="400"
                  align="center"
                >
                  Do you really want to delete this wallet ?
                </Typography>
              </ModalBody>
            )}
            <ModalCloseButtons>
              {isSuccess ? (
                <Button variant="contained" onClick={handleCloseModal}>
                  {" "}
                  Close{" "}
                </Button>
              ) : (
                <OptionButtons>
                  <Button
                    fullWidth
                    variant="contained"
                    color="inherit"
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </Button>
                  <Button
                    fullWidth
                    variant="contained"
                    color="error"
                    onClick={() => handleDeleteWallet()}
                  >
                    Delete
                  </Button>
                </OptionButtons>
              )}
            </ModalCloseButtons>
          </>
        )}
      </ModalContainer>
    </Modal>
  );
};

export default DeleteWalletModal;

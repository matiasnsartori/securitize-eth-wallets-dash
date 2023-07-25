import {
  FormGroup,
  FormLabel,
  TextField,
  FormControlLabel,
  Switch,
  Button,
} from "@mui/material";
import React, { FC } from "react";
import styled from "styled-components";
import { validateAddress } from "./helpers";

interface addwalletProps {
  handleSubmit: (address: string, name: string, favorite: boolean) => void;
}

const FormContainer = styled.div`
  display: flex;
  flex-direction: column;
  justify-content: center;
  margin: 0 auto;
  border-radius: 0px 0px 20px 20px;
  padding: 20px;
  background-color: #f5f2f2;
  box-shadow: 0 0 10px rgba(0, 0, 0, 0.2);
`;

const Addwallet: FC<addwalletProps> = ({ handleSubmit }) => {
  const [address, setAddress] = React.useState("");
  const [name, setName] = React.useState("");
  const [favorite, setFavorite] = React.useState(false);
  const [error, setError] = React.useState(false);

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    event.target.id === "address"
      ? setAddress(event.target.value)
      : setName(event.target.value);
  };

  return (
    <FormContainer>
      <h1 style={{ fontFamily: "Roboto" }}>Add Wallet</h1>
      <FormGroup>
        <FormLabel htmlFor="Wallet Address">Wallet Address</FormLabel>
        <TextField
          error={error}
          helperText={error ? "Invalid Address" : ""}
          onChange={handleChange}
          onFocus={() => setError(false)}
          onBlur={() => setError(!validateAddress(address))}
          id="address"
        />

        <FormLabel htmlFor="Name">Name</FormLabel>
        <TextField onChange={handleChange} id="name" />

        <FormControlLabel
          onClick={() => setFavorite(!favorite)}
          control={<Switch />}
          label="Favorite"
        />
        <Button
          disabled={!validateAddress(address)}
          variant="contained"
          onClick={() => handleSubmit(address, name, favorite)}
        >
          Add
        </Button>
      </FormGroup>
    </FormContainer>
  );
};

export default Addwallet;

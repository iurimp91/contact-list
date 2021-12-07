/* eslint-disable no-console */
import { Stack, TextField, Button, TextFieldProps } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import InputMask from "react-input-mask";
import React, { useState } from "react";

export default function Form(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [cep, setCep] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(name, email, birthday);
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Stack spacing="20px">
          <TextField
            required
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <DatePicker
            label="Birthday"
            value={birthday}
            onChange={(newValue) => setBirthday(newValue)}
            disableFuture
            clearable
            renderInput={(props) => (
              <TextField {...props} required />
            )}
          />
          <InputMask mask="99999-999" value={cep} onChange={(e) => setCep(e.target.value)}>
            {(props: JSX.IntrinsicAttributes & TextFieldProps) => <TextField label="CEP" required {...props} />}
          </InputMask>
          <TextField
            required
            label="Street"
            value={street}
            onChange={(e) => setStreet(e.target.value)}
          />
          <TextField
            required
            label="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            label="Complement"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
          <TextField
            required
            label="City"
            value={city}
            onChange={(e) => setCity(e.target.value)}
          />
          <TextField
            required
            label="State"
            value={state}
            onChange={(e) => setState(e.target.value)}
          />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveOutlined />}
          >
            Save
          </Button>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}

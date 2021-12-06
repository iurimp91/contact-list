/* eslint-disable no-console */
import { Stack, TextField, Button } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";

import React, { useState } from "react";

export default function Form(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState<Date | null>(null);

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
            renderInput={(props) => (
              <TextField {...props} required />
            )}
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

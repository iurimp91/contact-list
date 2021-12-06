/* eslint-disable no-console */
import { Stack, TextField, Button } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import React, { useState } from "react";

export default function Form(): JSX.Element {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [birthday, setBirthday] = useState("");

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    console.log(name, email, birthday);
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="20px">
        <TextField
          required
          label="Name"
          fullWidth
          value={name}
          onChange={(e) => setName(e.target.value)}
        />
        <TextField
          required
          label="Email"
          fullWidth
          type="email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <TextField
          required
          label="Birthday"
          fullWidth
          type="date"
          InputLabelProps={{ shrink: true }}
          value={birthday}
          onChange={(e) => setBirthday(e.target.value)}
        />
        <Button variant="contained" type="submit" startIcon={<SaveOutlined />}>
          Save
        </Button>
      </Stack>
    </form>
  );
}

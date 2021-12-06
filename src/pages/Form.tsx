import { Stack, TextField } from "@mui/material";

export default function Form() {
  return (
    <Stack spacing="20px">
      <TextField required label="Name" fullWidth />
      <TextField required label="Email" fullWidth type="email" />
      <TextField required label="Birthday" fullWidth type="date" InputLabelProps={{ shrink: true }} />
    </Stack>
  );
}
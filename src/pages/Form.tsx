/* eslint-disable no-console */
import { Stack, TextField, Button } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";

export default function Form(): JSX.Element {
  function handleSubmit() {
    console.log("oi");
  }

  return (
    <form onSubmit={handleSubmit}>
      <Stack spacing="20px">
        <TextField required label="Name" fullWidth />
        <TextField required label="Email" fullWidth type="email" />
        <TextField required label="Birthday" fullWidth type="date" InputLabelProps={{ shrink: true }} />
        <Button variant="contained" type="submit" startIcon={<SaveOutlined />}>
          Save
        </Button>
      </Stack>
    </form>
  );
}

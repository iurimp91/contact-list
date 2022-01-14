import { useController, UseControllerProps } from "react-hook-form";

import { TextField } from "@mui/material";

import Contact from "../interfaces/Contact";

interface InputProps extends UseControllerProps<Contact> {
  type?: string;
  disabled?: boolean;
}

export default function TextInput(props: InputProps): JSX.Element {
  const { field, fieldState } = useController(props);

  return (
    <TextField
      {...field}
      label={props.name.toUpperCase()}
      type={props.type}
      disabled={props.disabled}
      error={!!fieldState.error}
      helperText={fieldState.error?.message}
    />
  );
}

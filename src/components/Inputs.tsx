import { useController, UseControllerProps } from "react-hook-form";

import { TextField } from "@mui/material";

import Contact from "../interfaces/Contact";
import { DatePicker } from "@mui/lab";

interface InputProps extends UseControllerProps<Contact> {
  type?: string;
  disabled?: boolean;
}

function TextInput(props: InputProps): JSX.Element {
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

function DateInput(props: UseControllerProps<Contact>): JSX.Element {
  const { field, fieldState } = useController(props);

  return (
    <DatePicker
      {...field}
      label={props.name.toUpperCase()}
      openTo="year"
      views={["year", "month", "day"]}
      inputFormat="dd/MM/yyyy"
      clearable
      disableFuture
      renderInput={(params) => (
        <TextField
          id="birthday-input"
          helperText={fieldState.error?.message}
          {...params}
        />
      )}
    />
  );
}

export { TextInput, DateInput };

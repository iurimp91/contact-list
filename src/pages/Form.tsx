/* eslint-disable no-console */
import { useForm, SubmitHandler, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField } from "@mui/material";
import Contact from "../interfaces/Contact";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
});

export default function Form() {
  const {
    register,
    control,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(schema),
  });

  function formSubmitHandler(data: Contact): void {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Controller
        name="name"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            label="Name"
            error={!!errors.name}
            helperText={errors.name?.message}
          />
        )}
      />
      <br />
      <Controller
        name="email"
        control={control}
        defaultValue=""
        render={({ field }) => (
          <TextField
            {...field}
            type="email"
            label="Email"
            error={!!errors.email}
            helperText={errors.email?.message}
          />
        )}
      />
      <br />
      <input type="submit" />
    </form>
  );
}

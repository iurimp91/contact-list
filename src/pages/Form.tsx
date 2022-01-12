/* eslint-disable no-console */
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Stack, Button } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
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
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(schema),
  });

  function formSubmitHandler(data: Contact): void {
    console.log(data);
  }

  return (
    <form onSubmit={handleSubmit(formSubmitHandler)}>
      <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
        <Stack spacing={2} width="100%">
          <TextField
            {...register("name")}
            name="name"
            label="Name"
            defaultValue=""
            error={!!errors.name}
            helperText={errors.name?.message}
          />
          <TextField
            {...register("email")}
            name="email"
            type="email"
            label="Email"
            defaultValue=""
            error={!!errors.email}
            helperText={errors.email?.message}
          />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveOutlined />}
          >
            Save
          </Button>
        </Stack>
      </Stack>
    </form>
  );
}

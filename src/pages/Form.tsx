/* eslint-disable no-console */
import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Stack, Button } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import Contact from "../interfaces/Contact";

import { DatePicker, LocalizationProvider } from "@mui/lab";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  birthday: yup.date().required(),
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

  console.log(errors);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <Stack spacing={2} width="100%">
            <TextField
              {...register("name")}
              label="Name"
              defaultValue=""
              error={!!errors.name}
              helperText={errors.name?.message}
            />
            <TextField
              {...register("email")}
              type="email"
              label="Email"
              defaultValue=""
              error={!!errors.email}
              helperText={errors.email?.message}
            />
            <Controller
              name="birthday"
              control={control}
              defaultValue={null}
              render={({ field }) => (
                <DatePicker
                  label="Birthday"
                  onChange={(e) => field.onChange(e)}
                  value={field.value}
                  clearable
                  disableFuture
                  openTo="year"
                  renderInput={(params) => (
                    <TextField
                      helperText={errors.birthday?.message}
                      {...params}
                    />
                  )}
                />
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
        </Stack>
      </form>
    </LocalizationProvider>
  );
}

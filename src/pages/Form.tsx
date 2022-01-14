import { useForm, Controller } from "react-hook-form";
import { yupResolver } from "@hookform/resolvers/yup";
import * as yup from "yup";
import { TextField, Stack, Button } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import Contact from "../interfaces/Contact";

import { DatePicker, LocalizationProvider } from "@mui/lab";

import AdapterDateFns from "@mui/lab/AdapterDateFns";

import InputMask from "react-input-mask";

import axios from "axios";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import {
  getContactList,
  setContactList,
  updateContactList,
} from "../utils/localStorageHandlers";

const schema = yup.object().shape({
  name: yup.string().required(),
  email: yup.string().email().required(),
  birthday: yup.date().min(new Date("01/01/1900")).max(new Date()).required(),
  cep: yup.string().matches(/^\d{5}-\d{3}$/).required(),
  street: yup.string().required(),
  number: yup.number().required(),
  complement: yup.string().max(50),
  city: yup.string().required(),
  state: yup.string().required(),
});

export default function Form(): JSX.Element {
  const {
    setValue,
    getValues,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(schema),
  });
  const navigate = useNavigate();
  const { contactEmail } = useParams();

  function resetAddressInputs() {
    setValue("street", "");
    setValue("city", "");
    setValue("state", "");
  }

  function formSubmitHandler(data: Contact): void {
    const newContact: Contact = {
      ...data,
    };

    if (localStorage.getItem("contacts") === null) {
      setContactList([newContact]);
      toast.success("Contact created!");
    } else if (!contactEmail) {
      const currentList: Contact[] = getContactList();
      updateContactList(currentList, newContact);
      toast.success("Contact created!");
    } else {
      const contactList: Contact[] = getContactList();

      const arrayWithoutContact = contactList.filter(
        (contact) => contact.email !== contactEmail
      );

      updateContactList(arrayWithoutContact, newContact);
      toast.success("Contact updated!");
    }

    navigate("/");
  }

  useEffect(() => {
    if (!getValues("cep").match(/^\d{5}-\d{3}$/)) {
      resetAddressInputs();
      return;
    }

    const cepWithoutMask = getValues("cep").replace("-", "");
    axios
      .get(`https://viacep.com.br/ws/${cepWithoutMask}/json/`)
      .then((response) => {
        if (response.data.erro) {
          toast.error("This CEP doesn't exist, please, try again.");
        } else {
          setValue("street", response.data.logradouro, { shouldValidate: true });
          setValue("city", response.data.localidade, { shouldValidate: true });
          setValue("state", response.data.uf, { shouldValidate: true });
          toast.success("Address found!");
        }
      })
      .catch(() => {
        toast.error("Something went wrong, please, try again.");
      });
  }, [watch("cep")]);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit(formSubmitHandler)}>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <Stack spacing={2} width="100%">
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
            <Controller
              name="email"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Email"
                  type="email"
                  error={!!errors.email}
                  helperText={errors.email?.message}
                />
              )}
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
                  views={["year", "month", "day"]}
                  inputFormat="dd/MM/yyyy"
                  renderInput={(params) => (
                    <TextField
                      helperText={errors.birthday?.message}
                      {...params}
                    />
                  )}
                />
              )}
            />
            <Controller
              name="cep"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <InputMask {...field} mask="99999-999">
                  {() => (
                    <TextField
                      label="CEP"
                      error={!!errors.cep}
                      helperText={errors.cep?.message}
                    />
                  )}
                </InputMask>
              )}
            />
            <Controller
              name="street"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Street"
                  error={!!errors.street}
                  helperText={errors.street?.message}
                  disabled
                />
              )}
            />
          </Stack>
          <Stack spacing={2} width="100%">
            <Controller
              name="number"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Number"
                  type="number"
                  error={!!errors.number}
                  helperText={errors.number?.message}
                />
              )}
            />
            <Controller
              name="complement"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="Complement"
                  error={!!errors.complement}
                  helperText={errors.complement?.message}
                />
              )}
            />
            <Controller
              name="city"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="City"
                  error={!!errors.city}
                  helperText={errors.city?.message}
                  disabled
                />
              )}
            />
            <Controller
              name="state"
              control={control}
              defaultValue=""
              render={({ field }) => (
                <TextField
                  {...field}
                  label="State"
                  error={!!errors.state}
                  helperText={errors.state?.message}
                  disabled
                />
              )}
            />
            <Button
              disabled={Object.keys(errors).length !== 0}
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

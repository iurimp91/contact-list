/* eslint-disable no-console */
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
import { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";

import toast from "react-hot-toast";

import { v4 as uuid } from "uuid";

import {
  getContactList,
  getContactByEmail,
  setContactList,
  updateContactList,
  updateContact,
} from "../utils/localStorageHandlers";

const errorMessages = {
  required: { standard: "This field is required, please fill it.", address: "This field is required, please enter a valid CEP to fill it." },
  email: "Please, enter a valid email format.",
  birthday: { type: "Please, enter a valid date format (DD/MM/YYYY).", min: "The date should be higher than 01/01/1900.", max: "The date shouldn't be higher than today." },
  cep: "Please, enter a valid CEP format (xxxxx-xxx).",
  number: { type: "Please, use just numbers here.", min: "Number must be higher than 0." },
  complement: "Please, use only 50 characters.",
};

const schema = yup.object().shape({
  name: yup.string().required(errorMessages.required.standard),
  email: yup.string().email(errorMessages.email).required(errorMessages.required.standard),
  birthday: yup.date().typeError(errorMessages.birthday.type).min(new Date("01/01/1900"), errorMessages.birthday.min).max(new Date(), errorMessages.birthday.max).required(),
  cep: yup.string().matches(/^\d{5}-\d{3}$/, errorMessages.cep).required(),
  street: yup.string().required(errorMessages.required.address),
  number: yup.number().typeError(errorMessages.number.type).min(1, errorMessages.number.min).required(errorMessages.required.standard),
  complement: yup.string().max(50, errorMessages.complement),
  city: yup.string().required(errorMessages.required.address),
  state: yup.string().required(errorMessages.required.address),
});

const defaultValues = {
  id: uuid(),
  name: "",
  email: "",
  birthday: null,
  cep: "",
  street: "",
  number: "",
  complement: "",
  city: "",
  state: "",
};

export default function Form(): JSX.Element {
  const { contactEmail } = useParams();
  let contactData: Contact | undefined;

  if(contactEmail) {
    contactData = getContactByEmail(contactEmail);
  }

  const {
    setValue,
    getValues,
    watch,
    control,
    handleSubmit,
    formState: { errors },
  } = useForm<Contact>({
    resolver: yupResolver(schema),
    defaultValues: contactData || defaultValues,
  });
  const navigate = useNavigate();
  const [cepInputIsDisabled, setCepInputIsDisabled] = useState(false);

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
      updateContact(contactEmail, newContact);
      toast.success("Contact updated!");
    }

    navigate("/");
  }

  useEffect(() => {
    const cepMatchesPattern = getValues("cep").match(/^\d{5}-\d{3}$/);
    if (!cepMatchesPattern) {
      resetAddressInputs();
      return;
    }

    setCepInputIsDisabled(true);
    const cepWithoutMask = getValues("cep").replace("-", "");
    axios
      .get(`https://viacep.com.br/ws/${cepWithoutMask}/json/`)
      .then((response) => {
        if (response.data.erro) {
          setCepInputIsDisabled(false);
          toast.error("This CEP doesn't exist, please, try again.");
        } else {
          setValue("street", response.data.logradouro, { shouldValidate: true });
          setValue("city", response.data.localidade, { shouldValidate: true });
          setValue("state", response.data.uf, { shouldValidate: true });
          setCepInputIsDisabled(false);
          toast.success("Address found!");
        }
      })
      .catch(() => {
        setCepInputIsDisabled(false);
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
                <InputMask {...field} mask="99999-999" disabled={cepInputIsDisabled}>
                  {() => (
                    <TextField
                      label="CEP"
                      error={!!errors.cep}
                      helperText={errors.cep?.message}
                      disabled={cepInputIsDisabled}
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

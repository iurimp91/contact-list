import { Stack, TextField, Button, TextFieldProps } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import InputMask from "react-input-mask";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Contact from "../interfaces/Contact";
import Errors from "../interfaces/Errors";
import {
  getContactByEmail,
  getContactList,
  setContactList,
  updateContactList,
} from "../utils/localStorageHandlers";

const initialValues: Contact = {
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
  const [values, setValues] = useState<Contact>(initialValues);
  const [errors, setErrors] = useState<Errors>({});
  const [buttonIsDisabled, setButtonIsDisabled] = useState<boolean>(true);
  const { contactEmail } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!values.cep.match(/^\d{5}-\d{3}$/)) {
      resetAddressInputs();
      return;
    }

    const cepWithoutMask = values.cep.replace("-", "");
    axios
      .get(`https://viacep.com.br/ws/${cepWithoutMask}/json/`)
      .then((response) => {
        if (response.data.erro) {
          alert("This CEP doesn't exist, please, try again.");
          resetAddressInputs();
        } else {
          setValues({
            ...values,
            street: response.data.logradouro,
            complement: response.data.complemento,
            city: response.data.localidade,
            state: response.data.uf,
          });
          setErrors({ ...errors, cep: "" });
        }
      })
      .catch(() => {
        alert("Something went wrong, please, try again.");
        resetAddressInputs();
      });
  }, [values.cep]);

  useEffect(() => {
    if (!contactEmail) return;

    const contactList: Contact[] = getContactList();

    const contactData = getContactByEmail(contactList, contactEmail);

    setValues({ ...contactData });
    setErrors({ name: "", email: "", birthday: "", cep: "", number: "" });

    setButtonIsDisabled(false);
  }, []);

  function resetAddressInputs() {
    setValues({
      ...values,
      street: "",
      city: "",
      state: "",
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    const newContact: Contact = {
      ...values,
    };

    if (localStorage.getItem("contacts") === null) {
      setContactList([newContact]);
    } else if (!contactEmail) {
      const currentList: Contact[] = getContactList();
      updateContactList(currentList, newContact);
    } else {
      const contactList: Contact[] = getContactList();

      const arrayWithoutContact = contactList.filter(
        (contact) => contact.email !== contactEmail
      );

      updateContactList(arrayWithoutContact, newContact);
    }

    navigate("/");
  }

  function validateOnChange(inputField: Errors) {
    const temp: Errors = { ...errors };

    if ("name" in inputField) {
      temp.name = inputField.name ? "" : "This field is required";
    }
    if ("email" in inputField) {
      if (inputField.email === "") {
        temp.email = "This field is required";
      } else {
        temp.email = inputField.email?.match(
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
        )
          ? ""
          : "Please, enter a valid email";
      }
    }
    if ("birthday" in inputField) {
      temp.birthday = inputField.birthday ? "" : "This field is required";
    }
    if ("cep" in inputField) {
      if (inputField.cep === "") {
        temp.cep = "This field is required";
      } else {
        temp.cep =
          values.street && inputField.cep?.match(/^\d{5}-\d{3}$/)
            ? ""
            : "Please, enter a valid cep";
      }
    }
    if ("number" in inputField) {
      if (inputField.number === "") {
        temp.number = "This field is required";
      } else {
        const tempNumber = parseFloat(inputField.number || "");
        temp.number =
          tempNumber > 0 && Number.isInteger(tempNumber)
            ? ""
            : "Number should be an integer higher than 0";
      }
    }

    setErrors({ ...temp });

    const isValid =
      Object.values(temp).every((x) => x === "") &&
      Object.values(temp).length === 5;
    if (isValid) {
      setButtonIsDisabled(false);
    } else {
      setButtonIsDisabled(true);
    }
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });

    validateOnChange({ [name]: value });
  }

  function handleBlur(event: React.FocusEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    validateOnChange({ [name]: value });
  }

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Stack spacing={2} direction={{ xs: "column", sm: "row" }}>
          <Stack spacing={2} width="100%">
            <TextField
              label="Name"
              name="name"
              value={values.name}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.name}
              helperText={errors.name}
            />
            <TextField
              label="Email"
              name="email"
              type="email"
              value={values.email}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.email}
              helperText={errors.email}
            />
            <DatePicker
              label="Birthday"
              value={values.birthday}
              onChange={(date) => setValues({ ...values, birthday: date })}
              disableFuture
              clearable
              openTo="year"
              renderInput={(props) => (
                <TextField
                  name="birthday"
                  onBlur={handleBlur}
                  helperText={errors.birthday}
                  {...props}
                />
              )}
            />
            <InputMask
              mask="99999-999"
              name="cep"
              value={values.cep}
              onChange={handleChange}
              onBlur={handleBlur}
            >
              {(props: JSX.IntrinsicAttributes & TextFieldProps) => (
                <TextField
                  error={!!errors.cep}
                  helperText={errors.cep}
                  label="CEP"
                  {...props}
                />
              )}
            </InputMask>
            <TextField
              disabled
              label="Street"
              name="street"
              value={values.street}
            />
          </Stack>
          <Stack spacing={2} width="100%">
            <TextField
              type="number"
              label="Number"
              name="number"
              value={values.number}
              onChange={handleChange}
              onBlur={handleBlur}
              error={!!errors.number}
              helperText={errors.number}
            />
            <TextField
              label="Complement"
              name="complement"
              value={values.complement}
              onChange={handleChange}
            />
            <TextField disabled label="City" name="city" value={values.city} />
            <TextField
              disabled
              label="State"
              name="state"
              value={values.state}
            />
            <Button
              disabled={buttonIsDisabled}
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

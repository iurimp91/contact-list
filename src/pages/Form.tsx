/* eslint-disable no-console */
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

const initialErrorsValues: Errors = {
  name: "",
  email: "",
  birthday: "",
  cep: "",
  number: "",
};

export default function Form(): JSX.Element {
  const [values, setValues] = useState<Contact>(initialValues);
  const [errors, setErrors] = useState<Errors>(initialErrorsValues);
  const { contactEmail } = useParams();
  const navigate = useNavigate();

  function validate() {
    console.log("entrou validate");
    const temp: Errors = {
      name: "",
      email: "",
      birthday: "",
      cep: "",
      number: "",
    };
    temp.name = values.name ? "" : "This field is required";
    temp.email = values.email ? "" : "This field is required";
    temp.birthday = values.birthday ? "" : "This field is required";
    temp.cep = values.cep ? "" : "This field is required";
    temp.number = values.number ? "" : "This field is required";

    setErrors({ ...temp });

    return Object.values(temp).every((x) => x === "");
  }

  useEffect(() => {
    if (values.cep.includes("_") || values.cep === "") {
      resetAddressInputs();
      return;
    }

    const cepWithoutMask = values.cep.replace("-", "");
    axios
      .get(`https://viacep.com.br/ws/${cepWithoutMask}/json/`)
      .then((response) => {
        if (response.data.erro) {
          alert("O CEP informado não existe, por favor, tente novamente.");
          resetAddressInputs();
        } else {
          setValues({
            ...values,
            street: response.data.logradouro,
            complement: response.data.complemento,
            city: response.data.localidade,
            state: response.data.uf,
          });
        }
      })
      .catch(() => {
        alert(
          "Algo deu errado com sua requisição, por favor, tente novamente."
        );
        resetAddressInputs();
      });
  }, [values.cep]);

  useEffect(() => {
    if (!contactEmail) return;

    const contactList: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "null"
    );
    const contactData = contactList.filter(
      (contact) => contact.email === contactEmail
    )[0];
    setValues({
      ...contactData,
    });
  }, []);

  function resetAddressInputs() {
    setValues({
      ...values,
      street: "",
      number: "",
      complement: "",
      city: "",
      state: "",
    });
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();

    if (!validate()) return;

    const newContact: Contact = {
      ...values,
    };

    if (localStorage.getItem("contacts") === null) {
      localStorage.setItem("contacts", JSON.stringify([newContact]));
    } else if (!contactEmail) {
      const previousData: Contact[] = JSON.parse(
        localStorage.getItem("contacts") || "null"
      );
      localStorage.setItem(
        "contacts",
        JSON.stringify([...previousData, newContact])
      );
    } else {
      const contactList: Contact[] = JSON.parse(
        localStorage.getItem("contacts") || "null"
      );

      const arrayWithoutContact = contactList.filter(
        (contact) => contact.email !== contactEmail
      );

      localStorage.setItem(
        "contacts",
        JSON.stringify([...arrayWithoutContact, newContact])
      );
    }

    navigate("/");
  }

  function handleChange(event: React.ChangeEvent<HTMLInputElement>) {
    const { name, value } = event.target;

    setValues({
      ...values,
      [name]: value,
    });
  }

  console.log(values.birthday);

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Stack spacing="20px">
          <TextField
            label="Name"
            name="name"
            value={values.name}
            onChange={handleChange}
            error={errors.name !== ""}
            helperText={errors.name}
          />
          <TextField
            label="Email"
            name="email"
            type="email"
            value={values.email}
            onChange={handleChange}
            error={errors.email !== ""}
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
          >
            {(props: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField
                error={errors.cep !== ""}
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
          <TextField
            type="number"
            label="Number"
            name="number"
            value={values.number}
            onChange={handleChange}
            error={errors.number !== ""}
            helperText={errors.number}
          />
          <TextField
            label="Complement"
            name="complement"
            value={values.complement}
            onChange={handleChange}
          />
          <TextField disabled label="City" name="city" value={values.city} />
          <TextField disabled label="State" name="state" value={values.state} />
          <Button
            variant="contained"
            type="submit"
            startIcon={<SaveOutlined />}
          >
            Save
          </Button>
        </Stack>
      </form>
    </LocalizationProvider>
  );
}

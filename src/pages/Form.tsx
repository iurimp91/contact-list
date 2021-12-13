import { Stack, TextField, Button, TextFieldProps } from "@mui/material";
import { SaveOutlined } from "@mui/icons-material";
import { DatePicker, LocalizationProvider } from "@mui/lab";
import AdapterDateFns from "@mui/lab/AdapterDateFns";
import InputMask from "react-input-mask";
import axios from "axios";
import React, { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import Contact from "../interfaces/Contact";

export default function Form(): JSX.Element {
  const [name, setName] = useState<string>("");
  const [email, setEmail] = useState<string>("");
  const [birthday, setBirthday] = useState<Date | null>(null);
  const [cep, setCep] = useState<string>("");
  const [street, setStreet] = useState<string>("");
  const [number, setNumber] = useState<string>("");
  const [complement, setComplement] = useState<string>("");
  const [city, setCity] = useState<string>("");
  const [state, setState] = useState<string>("");
  const { contactEmail } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (cep.includes("_") || cep === "") {
      resetAddressInputs();
      return;
    }

    const cepWithoutMask = cep.replace("-", "");
    axios
      .get(`https://viacep.com.br/ws/${cepWithoutMask}/json/`)
      .then((response) => {
        if (response.data.erro) {
          alert("O CEP informado não existe, por favor, tente novamente.");
          resetAddressInputs();
        } else {
          setStreet(response.data.logradouro);
          setComplement(response.data.complemento);
          setCity(response.data.localidade);
          setState(response.data.uf);
        }
      })
      .catch(() => {
        alert("Algo deu errado com sua requisição, por favor, tente novamente.");
        resetAddressInputs();
      });
  }, [cep]);

  useEffect(() => {
    if (!contactEmail) return;

    const contactList: Contact[] = JSON.parse(
      localStorage.getItem("contacts") || "null"
    );
    const contactData = contactList.filter(
      (contact) => contact.email === contactEmail
    )[0];
    setName(contactData.name);
    setEmail(contactData.email);
    setBirthday(contactData.birthday);
    setCep(contactData.cep);
    setStreet(contactData.street);
    setNumber(contactData.number);
    setComplement(contactData.complement);
    setCity(contactData.city);
    setState(contactData.state);
  }, []);

  function resetAddressInputs() {
    setStreet("");
    setNumber("");
    setComplement("");
    setCity("");
    setState("");
  }

  function handleSubmit(event: React.FormEvent) {
    event.preventDefault();
    const newContact: Contact = {
      name,
      email,
      birthday,
      cep,
      street,
      number,
      complement,
      city,
      state,
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

  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <form onSubmit={handleSubmit}>
        <Stack spacing="20px">
          <TextField
            required
            label="Name"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <TextField
            required
            label="Email"
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <DatePicker
            label="Birthday"
            value={birthday}
            onChange={(newValue) => setBirthday(newValue)}
            disableFuture
            clearable
            renderInput={(props) => <TextField {...props} required />}
          />
          <InputMask
            mask="99999-999"
            value={cep}
            onChange={(e) => setCep(e.target.value)}
          >
            {(props: JSX.IntrinsicAttributes & TextFieldProps) => (
              <TextField label="CEP" required {...props} />
            )}
          </InputMask>
          <TextField
            required
            disabled
            label="Street"
            value={street}
          />
          <TextField
            required
            type="number"
            label="Number"
            value={number}
            onChange={(e) => setNumber(e.target.value)}
          />
          <TextField
            label="Complement"
            value={complement}
            onChange={(e) => setComplement(e.target.value)}
          />
          <TextField
            required
            disabled
            label="City"
            value={city}
          />
          <TextField
            required
            disabled
            label="State"
            value={state}
          />
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

import { ReactNode, useState } from "react";
import { Typography, Box } from "@mui/material";
import { ContactPageOutlined } from "@mui/icons-material";

const contactList = [
  { name: "Iuri Magnago Pinto" },
  { name: "José Carlos Andrade" },
  { name: "Rafaela Marin Souza" },
];

interface ContactCardProps {
  children: ReactNode;
}

function ContactCard({ children }: ContactCardProps): JSX.Element {
  return (
    <Box
      sx={{
        height: "50px",
        backgroundColor: "#EDEDED",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        mb: "20px",
        ":hover": {
          backgroundColor: "#DBDBDB",
        },
      }}
    >
      <ContactPageOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
      <Typography sx={{ fontSize: "23px", ml: "15px" }}>{children}</Typography>
    </Box>
  );
}

interface Contact {
  name: string,
  email: string,
  birthday: string,
  cep: string,
  street: string,
  number: string,
  complement: string,
  city: string,
  state: string
}

export default function Home(): JSX.Element {
  return (
    <>
      {contactList.map(({ name }) => (
        <ContactCard key={name}>{name}</ContactCard>
      ))}
    </>
  );
}

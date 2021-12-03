import { AppBar, Typography, Box, Container } from "@mui/material";
import { ContactPage } from "@mui/icons-material";
import { ReactNode } from "react";

const contactList = [
  { name: "Iuri Magnago Pinto" },
  { name: "José Carlos Andrade" },
  { name: "Rafaela Marin Souza" },
];

interface ContactProps {
  children: ReactNode;
}

function ContactCard({ children }: ContactProps): JSX.Element {
  return (
    <Box
      sx={{
        height: "50px",
        border: "1px solid #6AEFAB",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        mb: "20px"
      }}
    >
      <ContactPage sx={{ fontSize: "40px" }} />
      <Typography sx={{ fontSize: "23px", ml: "15px" }}>{children}</Typography>
    </Box>
  );
}

function App(): JSX.Element {
  return (
    <>
      <AppBar position="static" sx={{ padding: "10px" }}>
        <Typography variant="h4" textAlign="center">
          CONTACT LIST
        </Typography>
      </AppBar>
      <Container sx={{ mt: "20px" }}>
        {contactList.map(({ name }) => (
          <ContactCard key={name}>{name}</ContactCard>
        ))}
      </Container>
    </>
  );
}

export default App;

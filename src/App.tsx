import { AppBar, Typography, Box, Container } from "@mui/material";
import { ContactPageOutlined } from "@mui/icons-material";
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
        backgroundColor: "#EDEDED",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
        mb: "20px",
        ":hover": {
          backgroundColor: "#DBDBDB"
        }
      }}
    >
      <ContactPageOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
      <Typography sx={{ fontSize: "23px", ml: "15px" }}>{children}</Typography>
    </Box>
  );
}

function App(): JSX.Element {
  return (
    <Box sx={{ backgroundColor: "#FAFAFA" }}>
      <AppBar
        position="static"
        sx={{
          backgroundColor: "#FFFFFF",
        }}
      >
        <Typography
          sx={{ color: "#000000", textAlign: "center", fontSize: "32px" }}
        >
          CONTACT LIST
        </Typography>
      </AppBar>
      <Container sx={{ mt: "20px" }}>
        {contactList.map(({ name }) => (
          <ContactCard key={name}>{name}</ContactCard>
        ))}
      </Container>
    </Box>
  );
}

export default App;

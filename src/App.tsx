import { AppBar, Typography, Box, Container } from "@mui/material";
import { ContactPage } from "@mui/icons-material";

function ContactCard(): JSX.Element {
  return (
    <Box
      sx={{
        height: "50px",
        border: "1px solid #6AEFAB",
        borderRadius: "10px",
        display: "flex",
        alignItems: "center",
      }}
    >
      <ContactPage sx={{ fontSize: "40px" }} />
      <Typography sx={{ fontSize: "23px", ml: "15px" }}>
        Iuri Magnago Pinto
      </Typography>
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
        <ContactCard />
      </Container>
    </>
  );
}

export default App;

import { Routes, Route } from "react-router-dom";
import { AppBar, Typography, Container } from "@mui/material";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Form from "./pages/Form";

function Header(): JSX.Element {
  return (
    <AppBar
      position="fixed"
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
  );
}

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Container sx={{ backgroundColor: "#FAFAFA", pt: "68px", pb: "20px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact/:email" element={<ContactPage />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

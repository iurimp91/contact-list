import { Routes, Route } from "react-router-dom";
import { AppBar, Typography, Box, Container } from "@mui/material";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Form from "./pages/Form";

function App(): JSX.Element {
  return (
    <Box sx={{ backgroundColor: "#FAFAFA", height: "100vh" }}>
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
      <Container sx={{ mt: "40px" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact" element={<ContactPage />} />
          <Route path="/form" element={<Form />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;

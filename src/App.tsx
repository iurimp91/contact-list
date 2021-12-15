import { Routes, Route, useNavigate } from "react-router-dom";
import { AppBar, Typography, Container, Box, IconButton } from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";
import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Form from "./pages/Form";

function Header(): JSX.Element {
  const navigate = useNavigate();

  return (
    <AppBar
      position="fixed"
      sx={{
        backgroundColor: "#FFFFFF",
      }}
    >
      <Box display="flex" justifyContent="space-between" alignItems="center" px="10px">
        <Typography sx={{ color: "#000000", textAlign: "center", fontSize: "26px" }}>
          CONTACT LIST
        </Typography>
        <IconButton onClick={() => navigate("/")}>
          <HomeOutlined sx={{ color: "#ED75EF" }} />
        </IconButton>
      </Box>
    </AppBar>
  );
}

function App(): JSX.Element {
  return (
    <>
      <Header />
      <Container sx={{ backgroundColor: "#FAFAFA", pt: "68px", pb: "20px", minHeight: "100vh" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact/:contactEmail" element={<ContactPage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/form/:contactEmail" element={<Form />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

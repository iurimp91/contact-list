import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import { AppBar, Typography, Container, Box, IconButton } from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";

import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Form from "./pages/Form";
import AddNewButton from "./components/AddNewButton";

function Header(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <AppBar position="fixed" sx={{ backgroundColor: "#FFFFFF" }}>
      <Container>
        <Box display="flex" justifyContent="space-between" alignItems="center">
          <Typography
            sx={{ color: "#000000", textAlign: "center", fontSize: "26px" }}
          >
            CONTACT LIST
          </Typography>
          <Box>
            {pathname.includes("/form") ? (
              ""
            ) : (
              <AddNewButton
                sx={{ mr: "10px", display: { xs: "none", sm: "inline-flex" } }}
                onClick={() => navigate("/form")}
              />
            )}
            <IconButton onClick={() => navigate("/")}>
              <HomeOutlined sx={{ color: "#ED75EF" }} />
            </IconButton>
          </Box>
        </Box>
      </Container>
    </AppBar>
  );
}

function App(): JSX.Element {
  return (
    <>
      <Toaster />
      <Header />
      <Container
        sx={{
          backgroundColor: "#FAFAFA",
          pt: "68px",
          pb: "20px",
          minHeight: "100vh",
        }}
      >
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact/:contactId" element={<ContactPage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/form/:contactId" element={<Form />} />
        </Routes>
      </Container>
    </>
  );
}

export default App;

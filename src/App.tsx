import { Routes, Route, useNavigate, useLocation } from "react-router-dom";
import { Toaster } from "react-hot-toast";

import {
  AppBar,
  Typography,
  Box,
  IconButton,
  Toolbar,
} from "@mui/material";
import { HomeOutlined } from "@mui/icons-material";

import Home from "./pages/Home";
import ContactPage from "./pages/ContactPage";
import Form from "./pages/Form";
import AddNewButton from "./components/AddNewButton";

function Header(): JSX.Element {
  const navigate = useNavigate();
  const { pathname } = useLocation();

  return (
    <>
      <AppBar sx={{ background: "#FFFFFF" }}>
        <Toolbar sx={{ justifyContent: "space-between" }} >
          <Typography sx={{ color: "#000000", textAlign: "center", fontSize: "30px" }}>
            CONTACT LIST
          </Typography>
          <Box>
            {pathname.includes("/form") ? (
              ""
            ) : (
              <AddNewButton
                size="large"
                sx={{ mr: "10px", display: { xs: "none", sm: "inline-flex" } }}
                onClick={() => navigate("/form")}
              />
            )}
            <IconButton size="large" onClick={() => navigate("/")}>
              <HomeOutlined sx={{ color: "#ED75EF" }} />
            </IconButton>
          </Box>
        </Toolbar>
      </AppBar>
      <Toolbar />
    </>
  );
}

// TODO FIX MARGIN TOP AND LEFT AND LOOSE SCROLLING Y
function App(): JSX.Element {
  return (
    <>
      <Toaster />
      <Header />
      <Box
        sx={{ backgroundColor: "#FAFAFA", py: "20px", px: "20px", height: "calc(100vh - 104px)" }}>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/contact/:contactId" element={<ContactPage />} />
          <Route path="/form" element={<Form />} />
          <Route path="/form/:contactId" element={<Form />} />
        </Routes>
      </Box>
    </>
  );
}

export default App;

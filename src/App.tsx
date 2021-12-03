import { Routes, Route } from "react-router-dom";
import { AppBar, Typography, Box, Container } from "@mui/material";
import Home from "./pages/Home";

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
        <Routes>
          <Route path="/" element={<Home />} />
        </Routes>
      </Container>
    </Box>
  );
}

export default App;

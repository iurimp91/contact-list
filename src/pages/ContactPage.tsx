import { Box, Typography } from "@mui/material";
import { PersonOutlineOutlined, EmailOutlined, CakeOutlined } from "@mui/icons-material";

const contactData = {
  name: "Iuri Magnago Pinto",
  email: "henrique.weaver@pagaleve.com",
  birth: "11/06/1991",
  address: {
    cep: "29846-267",
    street: "Rua Muito Legal e Bacana",
    number: 37,
    complement: "Bacana De Novo",
    city: "Far Far Away",
    state: "ES",
  },
};

export default function ContactPage(): JSX.Element {
  return (
    <>
      <Box display="flex" alignItems="center" mb="15px">
        <PersonOutlineOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
        <Typography sx={{ fontSize: "25px", color: "#000000", ml: "10px" }}>
          {contactData.name}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mb="15px">
        <EmailOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
        <Typography sx={{ fontSize: "20px", color: "#000000", ml: "10px" }}>
          {contactData.email}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mb="15px">
        <CakeOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
        <Typography sx={{ fontSize: "20px", color: "#000000", ml: "10px" }}>
          {contactData.birth}
        </Typography>
      </Box>
    </>
  );
}

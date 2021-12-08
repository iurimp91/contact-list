import { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import { Box, Typography } from "@mui/material";
import {
  PersonOutlineOutlined,
  EmailOutlined,
  CakeOutlined,
  HomeOutlined,
} from "@mui/icons-material";
import Contact from "../interfaces/Contact";

export default function ContactPage(): JSX.Element {
  const [contact, setContact] = useState<Contact>();
  const { email } = useParams();

  useEffect(() => {
    const contactList: Contact[] = JSON.parse(localStorage.getItem("contacts") || "null");
    const contactData = contactList.filter((contact) => contact.email === email)[0];
    setContact(contactData);
  }, []);

  return (
    <>
      <Box display="flex" alignItems="center" mb="15px">
        <PersonOutlineOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
        <Typography sx={{ fontSize: "25px", color: "#000000", ml: "10px" }}>
          {contact?.name}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mb="15px">
        <EmailOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
        <Typography sx={{ fontSize: "20px", color: "#000000", ml: "10px" }}>
          {contact?.email}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mb="15px">
        <CakeOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
        <Typography sx={{ fontSize: "20px", color: "#000000", ml: "10px" }}>
          {contact?.birthday}
        </Typography>
      </Box>
      <Box display="flex" alignItems="center" mt="30px">
        <HomeOutlined sx={{ fontSize: "40px", color: "#ED75EF" }} />
        <Typography sx={{ fontSize: "25px", color: "#000000", ml: "10px" }}>
          ADDRESS
        </Typography>
      </Box>
      <Typography sx={{ fontSize: "20px", color: "#000000", mt: "15px" }}>
        {contact?.street}, {contact?.number}
      </Typography>
      <Typography sx={{ fontSize: "20px", color: "#000000", mt: "15px" }}>
        {contact?.cep}
      </Typography>
      <Typography sx={{ fontSize: "20px", color: "#000000", mt: "15px" }}>
        {contact?.city}/{contact?.state}
      </Typography>
      <Typography sx={{ fontSize: "20px", color: "#000000", mt: "15px" }}>
        Complement: {contact?.complement}
      </Typography>
    </>
  );
}

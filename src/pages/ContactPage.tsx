import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import { Box, Typography, Button, Container } from "@mui/material";
import {
  PersonOutlineOutlined,
  EmailOutlined,
  CakeOutlined,
  HomeOutlined,
  ModeEditOutline,
  DeleteOutline,
} from "@mui/icons-material";
import Contact from "../interfaces/Contact";
import {
  getContactList,
  getContactByEmail,
  setContactList,
} from "../utils/localStorageHandlers";
import dayjs from "dayjs";

export default function ContactPage(): JSX.Element {
  const [contact, setContact] = useState<Contact>();
  const { contactEmail } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!contactEmail) return;

    const contactList: Contact[] = getContactList();

    const contactData = getContactByEmail(contactList, contactEmail);

    if(!contactData) {
      alert("The contact couldn't be found, please, try again.");
      navigate("/");
    }
    
    setContact(contactData);
  }, []);

  function handleDelete() {
    const contactList: Contact[] = getContactList();

    const arrayWithoutContact = contactList.filter(
      (contact) => contact.email !== contactEmail
    );

    setContactList(arrayWithoutContact);

    navigate("/");
  }

  return (
    <Container maxWidth="sm">
      <Box
        p={{ xs: "0", sm: "15px" }}
        boxShadow={{ xs:"none", sm: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        borderRadius="15px"
        sx={{ backgroundColor: { xs: "inherit", sm: "#FFFFFF" } }}
      >
        <Box display="flex" alignItems="center" mb="15px">
          <PersonOutlineOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
          <Typography
            sx={{
              fontSize: "25px",
              color: "#000000",
              ml: "10px",
              wordBreak: "break-all",
            }}
          >
            {contact?.name}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb="15px">
          <EmailOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
          <Typography
            sx={{
              fontSize: "20px",
              color: "#000000",
              ml: "10px",
              wordBreak: "break-all",
            }}
          >
            {contact?.email}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mb="15px">
          <CakeOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
          <Typography sx={{ fontSize: "20px", color: "#000000", ml: "10px" }}>
            {dayjs(contact?.birthday).format("DD-MM-YYYY")}
          </Typography>
        </Box>
        <Box display="flex" alignItems="center" mt="30px">
          <HomeOutlined sx={{ fontSize: "40px", color: "#ED75EF" }} />
          <Typography sx={{ fontSize: "25px", color: "#000000", ml: "10px" }}>
            ADDRESS
          </Typography>
        </Box>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#000000",
            mt: "15px",
            wordBreak: "break-all",
          }}
        >
          {contact?.street}, {contact?.number}
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#000000",
            mt: "15px",
            wordBreak: "break-all",
          }}
        >
          {contact?.cep}
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#000000",
            mt: "15px",
            wordBreak: "break-all",
          }}
        >
          {contact?.city}/{contact?.state}
        </Typography>
        <Typography
          sx={{
            fontSize: "20px",
            color: "#000000",
            mt: "15px",
            wordBreak: "break-all",
          }}
        >
          {contact?.complement && `Complement: ${contact?.complement}`}
        </Typography>
        <Button
          fullWidth
          color="secondary"
          sx={{ mt: "20px" }}
          variant="contained"
          startIcon={<ModeEditOutline />}
          onClick={() => navigate(`/form/${contact?.email}`)}
        >
          EDIT
        </Button>
        <Button
          fullWidth
          color="secondary"
          sx={{ mt: "20px" }}
          variant="outlined"
          startIcon={<DeleteOutline />}
          onClick={handleDelete}
        >
          DELETE
        </Button>
      </Box>
    </Container>
  );
}

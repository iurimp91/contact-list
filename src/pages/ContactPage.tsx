import { useEffect, useState } from "react";
import { useParams, useNavigate } from "react-router-dom";
import dayjs from "dayjs";
import { Box, Typography, Button, Container, TypographyProps } from "@mui/material";
import {
  PersonOutlineOutlined,
  EmailOutlined,
  CakeOutlined,
  HomeOutlined,
  ModeEditOutline,
  DeleteOutline,
} from "@mui/icons-material";
import toast from "react-hot-toast";
import Contact from "../interfaces/Contact";
import {
  getContactList,
  getContactById,
  setContactList,
} from "../utils/localStorageHandlers";

function ContactPageText(props: TypographyProps) {
  return (
    <Typography
      fontSize="25px"
      sx={{ color: "#000000", ml: "10px", wordBreak: "break-all" }}
      {...props}
    />
  );
}

export default function ContactPage(): JSX.Element {
  const [contact, setContact] = useState<Contact>();
  const { contactId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (!contactId) return navigate("/");

    const contactData = getContactById(contactId);

    if (!contactData) {
      toast.error("The contact couldn't be found, please, try again.");
      return navigate("/");
    }

    setContact(contactData);
  }, []);

  function handleDelete() {
    const contactList: Contact[] = getContactList();

    const arrayWithoutContact = contactList.filter(
      (contact) => contact.id !== contactId
    );

    setContactList(arrayWithoutContact);

    toast.success("The contact was deleted.");
    navigate("/");
  }

  return (
    <Container maxWidth="sm">
      <Box
        p={{ xs: "0", sm: "15px" }}
        boxShadow={{ xs: "none", sm: "rgba(99, 99, 99, 0.2) 0px 2px 8px 0px" }}
        borderRadius="15px"
        sx={{ backgroundColor: { xs: "inherit", sm: "#FFFFFF" } }}
      >
        <Box display="flex" alignItems="center" mb="15px">
          <PersonOutlineOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
          <ContactPageText>
            {contact?.name}
          </ContactPageText>
        </Box>
        <Box display="flex" alignItems="center" mb="15px">
          <EmailOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
          <ContactPageText fontSize="20px">
            {contact?.email}
          </ContactPageText>
        </Box>
        <Box display="flex" alignItems="center" mb="15px">
          <CakeOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
          <ContactPageText fontSize="20px">
            {dayjs(contact?.birthday).format("DD/MM/YYYY")}
          </ContactPageText>
        </Box>
        <Box display="flex" alignItems="center" mt="30px">
          <HomeOutlined sx={{ fontSize: "40px", color: "#ED75EF" }} />
          <ContactPageText>
            ADDRESS
          </ContactPageText>
        </Box>
        <ContactPageText fontSize="20px" mt="15px">
          {contact?.street}, {contact?.number}
        </ContactPageText>
        <ContactPageText fontSize="20px" mt="15px">
          {contact?.cep}
        </ContactPageText>
        <ContactPageText fontSize="20px" mt="15px">
          {contact?.city}/{contact?.state}
        </ContactPageText>
        <ContactPageText fontSize="20px" mt="15px">
          {contact?.complement && `Complement: ${contact?.complement}`}
        </ContactPageText>
        <Button
          variant="contained"
          color="secondary"
          fullWidth
          sx={{ mt: "20px" }}
          startIcon={<ModeEditOutline />}
          onClick={() => navigate(`/form/${contact?.id}`)}
        >
          EDIT
        </Button>
        <Button
          variant="outlined"
          color="secondary"
          fullWidth
          sx={{ mt: "20px" }}
          startIcon={<DeleteOutline />}
          onClick={handleDelete}
        >
          DELETE
        </Button>
      </Box>
    </Container>
  );
}

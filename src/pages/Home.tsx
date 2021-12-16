import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import Contact from "../interfaces/Contact";
import { useNavigate } from "react-router-dom";
import { getContactList, sortContactList } from "../utils/localStorageHandlers";
import AddNewButton from "../components/AddNewButton";
import { ContactCardMobile, ContactCardDesktop } from "../components/ContactCard";

export default function Home(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const contactList: Contact[] = getContactList();

    if (!contactList) return;

    sortContactList(contactList);

    setContacts(contactList);
  }, []);

  return (
    <>
      <Box display={{ xs: "block", sm: "none" }}>
        <AddNewButton fullWidth onClick={() => navigate("/form")} />
      </Box>
      {contacts
        ? contacts.map(({ name, email }) => (
          <ContactCardMobile key={email} onClick={() => navigate(`/form/${email}`)} >
            <Typography sx={{ fontSize: "23px", ml: "15px" }}>
              {name}
            </Typography>
          </ContactCardMobile>
        ))
        : "No contacts yet"}
    </>
  );
}

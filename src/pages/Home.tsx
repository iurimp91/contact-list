import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import Contact from "../interfaces/Contact";
import { useNavigate } from "react-router-dom";
import { getContactList, sortContactList } from "../utils/localStorageHandlers";
import AddNewButton from "../components/AddNewButton";
import {
  ContactCardMobile,
  ContactCardDesktop,
} from "../components/ContactCard";

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
      {contacts ? (
        <Box display="flex" flexDirection={{ xs: "column", sm: "row" }} justifyContent="space-around" flexWrap="wrap">
          {contacts.map(({ name, email }) => (
            <>
              <ContactCardMobile display={{ xs: "flex", sm: "none" }} key={email} onClick={() => navigate(`/contact/${email}`)}>
                <Typography sx={{ fontSize: "23px", ml: "15px" }}>
                  {name}
                </Typography>
              </ContactCardMobile>
              <ContactCardDesktop display={{ xs: "none", sm: "flex" }} key={email} onClick={() => navigate(`/contact/${email}`)}>
                <Typography sx={{ fontSize: "23px" }}>{name}</Typography>
                <Typography sx={{ fontSize: "19px" }}>{email}</Typography>
              </ContactCardDesktop>
            </>
          ))}
        </Box>
      ) : (
        "No contacts yet"
      )}
    </>
  );
}

import { useEffect, useState } from "react";
import { Typography, Box, Grid } from "@mui/material";
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
      <Box display={{ xs: "block", sm: "none" }} mb="20px">
        <AddNewButton fullWidth onClick={() => navigate("/form")} />
      </Box>
      {contacts ? (
        <Grid
          container
          spacing={3}
          direction={{ xs: "column", sm: "row" }}
          justifyContent="center"
        >
          {contacts.map(({ name, email }) => (
            <Grid item key={email}>
              <ContactCardMobile
                display={{ xs: "flex", sm: "none" }}
                onClick={() => navigate(`/contact/${email}`)}
              >
                <Typography
                  sx={{
                    fontSize: "23px",
                    wordBreak: "break-all",
                  }}
                >
                  {name}
                </Typography>
              </ContactCardMobile>
              <ContactCardDesktop
                display={{ xs: "none", sm: "flex" }}
                onClick={() => navigate(`/contact/${email}`)}
              >
                <Typography
                  sx={{
                    fontSize: "23px",
                    width: "190px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    ":hover": {
                      whiteSpace: "normal",
                      overflow: "initial",
                      wordBreak: "break-all",
                    }
                  }}
                >
                  {name}
                </Typography>
                <Typography
                  sx={{
                    fontSize: "19px",
                    width: "190px",
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    ":hover": {
                      whiteSpace: "normal",
                      overflow: "initial",
                      wordBreak: "break-all",
                    },
                  }}
                >
                  {email}
                </Typography>
              </ContactCardDesktop>
            </Grid>
          ))}
        </Grid>
      ) : (
        "No contacts yet"
      )}
    </>
  );
}

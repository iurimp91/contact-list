import { useEffect, useState } from "react";
import { Typography, Box, Button } from "@mui/material";
import { ContactPageOutlined, AddBoxOutlined } from "@mui/icons-material";
import Contact from "../interfaces/Contact";
import { useNavigate } from "react-router-dom";
import { getContactList, sortContactList } from "../utils/localStorageHandlers";

export default function Home(): JSX.Element {
  const [contacts, setContacts] = useState<Contact[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    const contactList: Contact[] = getContactList();

    sortContactList(contactList);

    setContacts(contactList);
  }, []);

  return (
    <>
      <Button
        fullWidth
        variant="outlined"
        startIcon={<AddBoxOutlined />}
        onClick={() => navigate("/form")}
      >
        ADD NEW
      </Button>
      {contacts
        ? contacts.map(({ name, email }) => (
          <Box
            key={email}
            sx={{
              height: "50px",
              backgroundColor: "#EDEDED",
              borderRadius: "10px",
              display: "flex",
              alignItems: "center",
              mt: "20px",
              cursor: "pointer",
              ":hover": {
                backgroundColor: "#DBDBDB",
              },
            }}
            onClick={() => navigate(`/contact/${email}`)}
          >
            <ContactPageOutlined
              sx={{ fontSize: "40px", color: "#6AEFAB" }}
            />
            <Typography sx={{ fontSize: "23px", ml: "15px" }}>
              {name}
            </Typography>
          </Box>
        ))
        : "No contacts yet"}
    </>
  );
}

import { useEffect, useState } from "react";
import { Typography, Box } from "@mui/material";
import { ContactPageOutlined } from "@mui/icons-material";
import Contact from "../interfaces/Contact";
import { useNavigate } from "react-router-dom";

export default function Home(): JSX.Element {
  const [contactList, setContactList] = useState<Contact[] | null>(null);
  const navigate = useNavigate();

  useEffect(() => {
    setContactList(JSON.parse(localStorage.getItem("contacts") || "null"));
  }, []);

  return (
    <>
      {contactList
        ? contactList.map(({ name, email }) => (
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
            <ContactPageOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
            <Typography sx={{ fontSize: "23px", ml: "15px" }}>
              {name}
            </Typography>
          </Box>
        ))
        : "No contacts yet"}
    </>
  );
}

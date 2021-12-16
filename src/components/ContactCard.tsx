import { Box, BoxProps } from "@mui/material";
import { ContactPageOutlined } from "@mui/icons-material";

function ContactCardBase(props: BoxProps) {
  return (
    <Box
      sx={{
        mt: "20px",
        alignItems: "center",
        backgroundColor: "#EDEDED",
        borderRadius: "10px",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#DBDBDB",
        },
      }}
      {...props}
    />
  );
}

function ContactCardMobile(props: BoxProps) {
  return (
    <ContactCardBase height="50px" {...props}>
      <ContactPageOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
      {props.children}
    </ContactCardBase>
  );
}

function ContactCardDesktop(props: BoxProps) {
  return (
    <ContactCardBase ml="10px" width="250px" height="100px" {...props}>
      <ContactPageOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
      <Box ml="15px">
        {props.children}
      </Box>
    </ContactCardBase>
  );
}

export { ContactCardMobile, ContactCardDesktop };

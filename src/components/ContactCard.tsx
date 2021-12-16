import { Box, BoxProps } from "@mui/material";
import { ContactPageOutlined } from "@mui/icons-material";

function ContactCardBase(props: BoxProps) {
  return (
    <Box
      sx={{
        display: "flex",
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
    <ContactCardBase height="50px" mt="20px" {...props}>
      <ContactPageOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
      {props.children}
    </ContactCardBase>
  );
}

function ContactCardDesktop(children: JSX.Element) {
  return (
    <ContactCardBase width="250px" height="100px">
      <ContactPageOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
      <Box ml="15px">
        {children}
      </Box>
    </ContactCardBase>
  );
}

export { ContactCardMobile, ContactCardDesktop };

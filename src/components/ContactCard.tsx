import { Box, BoxProps } from "@mui/material";
import { ContactPageOutlined } from "@mui/icons-material";

function ContactCardBase(props: BoxProps) {
  return (
    <Box
      sx={{
        alignItems: "center",
        backgroundColor: "#EDEDED",
        borderRadius: "10px",
        cursor: "pointer",
        ":hover": {
          backgroundColor: "#DBDBDB",
          height: "100%",
        },
      }}
      {...props}
    />
  );
}

function ContactCardMobile(props: BoxProps) {
  return (
    <ContactCardBase paddingY="5px" {...props}>
      <ContactPageOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
      {props.children}
    </ContactCardBase>
  );
}

function ContactCardDesktop(props: BoxProps) {
  return (
    <ContactCardBase width="270px" height="100px" {...props}>
      <ContactPageOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
      <Box ml="15px">
        {props.children}
      </Box>
    </ContactCardBase>
  );
}

export { ContactCardMobile, ContactCardDesktop };

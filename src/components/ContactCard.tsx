import { Box, BoxProps } from "@mui/material";
import { ContactPageOutlined } from "@mui/icons-material";

function ContactCardBase(props: BoxProps): JSX.Element {
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

function ContactCardMobile(props: BoxProps): JSX.Element {
  return (
    <ContactCardBase paddingY="5px" {...props}>
      <ContactPageOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
      {props.children}
    </ContactCardBase>
  );
}

function ContactCardDesktop(props: BoxProps): JSX.Element {
  return (
    <ContactCardBase width="270px" minHeight="100px" {...props}>
      <ContactPageOutlined sx={{ fontSize: "40px", color: "#6AEFAB" }} />
      <Box ml="15px">
        {props.children}
      </Box>
    </ContactCardBase>
  );
}

export { ContactCardMobile, ContactCardDesktop };

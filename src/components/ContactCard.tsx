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
        transition: "all ease 200ms",
        ":hover": {
          minHeight: { xs: "100%", sm: "110px" },
          boxShadow: "rgba(14, 30, 37, 0.12) 0px 2px 4px 0px, rgba(14, 30, 37, 0.32) 0px 2px 16px 0px"
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

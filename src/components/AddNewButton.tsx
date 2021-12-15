import { Button, ButtonProps } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";

export default function AddNewButton(props: ButtonProps) {
  return (
    <Button
      color="secondary"
      variant="outlined"
      startIcon={<AddBoxOutlined />}
      {...props}
    >
      ADD NEW
    </Button>
  );
}
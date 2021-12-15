import { Button } from "@mui/material";
import { AddBoxOutlined } from "@mui/icons-material";

interface AddNewButtonProps {
  onClick: () => void;
}

export default function AddNewButton(props: AddNewButtonProps) {
  return (
    <Button
      fullWidth
      color="secondary"
      variant="outlined"
      startIcon={<AddBoxOutlined />}
      onClick={props.onClick}
    >
      ADD NEW
    </Button>
  );
}
import Button from "@mui/material/Button";
import CloudIcon from "@mui/icons-material/Cloud";
import LaptopIcon from "@mui/icons-material/Laptop";
import AttachFileIcon from "@mui/icons-material/AttachFile";

function CustomButton(props) {
  const { onClickFunc } = props;

  let icon = <></>;
  if (props.icon) {
    if (props.icon === "attach") {
      icon = <AttachFileIcon></AttachFileIcon>;
    } else if (props.icon === "laptop") {
      icon = <LaptopIcon></LaptopIcon>;
    } else if (props.icon === "cloud") {
      icon = <CloudIcon></CloudIcon>;
    }
  }

  return (
    <Button
      variant="outlined"
      onClick={onClickFunc ? (e) => onClickFunc(e) : null}
      color={props.color}
      startIcon={icon}
    >
      {props.text}
    </Button>
  );
}

export default CustomButton;

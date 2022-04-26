import styled from "@emotion/styled";
import { Button, ButtonProps } from "@mui/material";
import { spacing } from "@mui/system";

interface Props extends ButtonProps {
  children: string;
}

const StyledButton = styled(Button)(
  (props: any) => ({
    lineHeight: "150%",
    fontWeight: 700,
    fontSize: "16px",
    borderRadius: "8px",
    padding: "6px 17px",
    boxShadow: "0px 2px black",
  }),
  spacing
);

const CustomButton = (props: Props) => {
  return <StyledButton {...props}>{props.children}</StyledButton>;
};

export default CustomButton;

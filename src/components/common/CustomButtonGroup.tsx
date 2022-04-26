import styled from "@emotion/styled";
import { ButtonGroup, ButtonGroupProps } from "@mui/material";
import React from "react";
import { theme } from "../../Theme";

interface Props extends ButtonGroupProps {
  children: JSX.Element | JSX.Element[];
}

const StyledButtonGroup = styled(ButtonGroup)({
  display: "flex",
  flexDirection: "row",
  alignItems: "center",
  "& > *:not(:last-child)": {
    marginRight: theme.spacing(2),
  },
  "& > .MuiButtonGroup-grouped:not(:last-of-type), .MuiButtonGroup-grouped:last-of-type":
    {
      borderRadius: "8px",
    },
});

const CustomButtonGroup = (props: Props) => {
  return <StyledButtonGroup {...props}>{props.children}</StyledButtonGroup>;
};

export default CustomButtonGroup;

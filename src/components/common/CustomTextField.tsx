import React from "react";
import { StandardTextFieldProps, TextField } from "@mui/material";
import styled from "@emotion/styled";

interface Props extends StandardTextFieldProps {}

const StyledTextField = styled(TextField)({
  width: "250px",
  "& .MuiFormControl-root": {
    textDecoration: "none",
  },
  "& .MuiInput-input": {
    padding: 0,
  },
});

const CustomTextField = (props: Props) => {
  return <StyledTextField {...props}>{props.children}</StyledTextField>;
};

export default CustomTextField;

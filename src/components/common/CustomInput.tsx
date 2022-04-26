import styled from "@emotion/styled";
import { InputBaseProps, OutlinedInput } from "@mui/material";

interface Props extends InputBaseProps {}

const StyledInput = styled(OutlinedInput)({
  color: "black",
  borderRadius: "4px",
  padding: "0 10px",

  "& .MuiInputLabel-root": {
    margin: "0 15px 10px 15px",
  },
});

const CustomInput = (props: Props) => {
  return <StyledInput {...props} />;
};

export default CustomInput;

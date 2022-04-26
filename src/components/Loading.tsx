import styled from "@emotion/styled";
import { Box, CircularProgress } from "@mui/material";

const StyledWrapper = styled(Box)((props: any) => ({
  position: "fixed",
  display: "block",
  left: 0,
  top: 0,
  width: "100vw",
  height: "100vh",
  backgroundColor: props.theme.palette.secondary.main,
  opacity: 0.7,
  zIndex: 1000,
  justifyContent: "center",
  alignItems: "center",
  transition: "opacity 0.2s linear",
  transform: "opacity 1s linear",
}));

const Loading = () => {
  return (
    <StyledWrapper>
      <CircularProgress
        sx={{ marginLeft: "50%", marginTop: "25%" }}
        color="primary"
      />
    </StyledWrapper>
  );
};

export default Loading;

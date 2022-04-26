import { createTheme } from "@mui/material/styles";

export const themeOptions = {
  palette: {
    type: "light",
    primary: {
      main: "#391df2",
      light: "#5941f2",
      dark: "#4836bf",
    },
    secondary: {
      main: "#c6c6c6",
      light: "#F2F3F8",
    },
    background: {
      default: "#ffffff",
      paper: "#f2f2f2",
    },
    text: {
      primary: "rgba(76,71,71,0.87)",
    },
    error: {
      main: "#f20c1f",
    },
    info: {
      main: "#268bff",
      light: "#4099ff",
    },
    warning: {
      main: "#F2CB05",
      light: "#f2e205",
    },
    success: {
      main: "#4caf50",
    },
  },
  typography: {
    h1: {
      fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h2: {
      fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h3: {
      fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h4: {
      fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h5: {
      fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    h6: {
      fontFamily: '"Lato", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    subtitle1: {
      fontFamily:
        '"Open Sans", "Lato", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    subtitle2: {
      fontFamily:
        '"Open Sans", "Lato", "Roboto", "Helvetica", "Arial", sans-serif',
    },
    body1: {
      fontFamily: '"Arial", "Tahoma", sans-serif',
    },
    body2: {
      fontFamily: '"Arial", "Tahoma", sans-serif',
    },
    button: {
      fontFamily: '"Helvetica",  "Arial", sans-serif',
    },
  },
  props: {
    MuiButton: {
      size: "small",
    },
    MuiButtonGroup: {
      size: "small",
    },
    MuiCheckbox: {
      size: "small",
    },
    MuiFab: {
      size: "small",
    },
    MuiFormControl: {
      margin: "dense",
      size: "small",
    },
    MuiFormHelperText: {
      margin: "dense",
    },
    MuiIconButton: {
      size: "small",
    },
    MuiInputBase: {
      margin: "dense",
    },
    MuiInputLabel: {
      margin: "dense",
    },
    MuiRadio: {
      size: "small",
    },
    MuiSwitch: {
      size: "small",
    },
    MuiTextField: {
      margin: "dense",
      size: "small",
    },
  },
};

export const theme = createTheme(themeOptions);

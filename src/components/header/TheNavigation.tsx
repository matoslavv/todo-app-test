import { AppBar, Toolbar, Typography } from "@mui/material";

const TheNavigation = () => {
  return (
    <AppBar
      position="fixed"
      sx={{
        width: { sm: "calc(100% - 220px)" },
        ml: { sm: "220px" },
      }}
    >
      <Toolbar>
        <Typography variant="h6" component="div" sx={{ flexGrow: 1 }}>
          ToDo App
        </Typography>
      </Toolbar>
    </AppBar>
  );
};

export default TheNavigation;

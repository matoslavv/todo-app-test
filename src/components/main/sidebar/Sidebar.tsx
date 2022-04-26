import {
  Box,
  List,
  ListItem,
  ListItemIcon,
  ListItemText,
  Divider,
  Drawer,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { ITodosListForm } from "../../../types/ITodoList";
import SidebarList from "./SidebarList";
import styled from "@emotion/styled";
import { createList } from "../../../store/slices/listSlice";
import { useAppDispatch } from "../../../store/store";

const StyledDrawer = styled(Drawer)({
  width: "70%",
  flexShrink: 0,
  backgroundColor: "black",
  "& .MuiDrawer-paper": {
    boxSizing: "border-box",
    width: "220px",
  },
  "::-webkit-scrollbar-thumb": { backgroundColor: "black" },
});

const SideBar = () => {
  const dispatch = useAppDispatch();

  const handleClick = () => {
    const newList: ITodosListForm = {
      name: "Untilted list",
      tasks: [],
    };

    dispatch(createList(newList));
  };

  const list = (
    <Box>
      <List>
        <ListItem button onClick={handleClick}>
          <ListItemIcon>
            <AddIcon />
          </ListItemIcon>
          <ListItemText primary="Add new list" />
        </ListItem>
      </List>
      <Divider />
      <SidebarList />
    </Box>
  );

  return (
    <Box
      component="nav"
      sx={{
        width: { sm: 220 },
        flexShrink: { sm: 0 },
      }}
    >
      <StyledDrawer variant="permanent" open ModalProps={{ keepMounted: true }}>
        {list}
      </StyledDrawer>
    </Box>
  );
};

export default SideBar;

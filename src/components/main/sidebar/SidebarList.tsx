import styled from "@emotion/styled";
import { List, ListItemButton, ListItemText, ListItem } from "@mui/material";
import { Link } from "react-router-dom";
import LoadingButton from "@mui/lab/LoadingButton";
import { truncate } from "lodash";
import { useSelector } from "react-redux";
import { IRootStore } from "../../../store/store";
import { ITodosList } from "../../../types/ITodoList";

const StyledLink = styled(Link)({
  textDecoration: "none",
  width: "100%",
});

const StyledText = styled(ListItemText)({
  color: "black",
  fontSize: "24px",
  textAlign: "right",
  textDecoration: "none",
  marginRight: "15px",
  height: "25px",
});

const StyledLoading = styled(LoadingButton)({
  width: "100%",
  height: "50px",
});

const SidebarList = () => {
  const lists = useSelector((state: IRootStore) => state.list.lists);
  const submitting = useSelector((state: IRootStore) => state.list.submitting);

  return (
    <List>
      {lists.map((list: ITodosList) => (
        <ListItem disablePadding key={list.id}>
          <StyledLink to={`/list/${list.id}`}>
            <ListItemButton>
              <StyledText primary={truncate(list.name, { length: 14 })} />
            </ListItemButton>
          </StyledLink>
        </ListItem>
      ))}
      {submitting && (
        <ListItem disablePadding>
          <StyledLoading loading fullWidth />
        </ListItem>
      )}
    </List>
  );
};

export default SidebarList;

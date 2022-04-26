import { Box, Typography, IconButton } from "@mui/material";
import React, { ChangeEvent, KeyboardEvent, useState } from "react";
import EditIcon from "@mui/icons-material/Edit";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import styled from "@emotion/styled";
import CustomButton from "../../common/CustomButton";
import { IRootStore, useAppDispatch } from "../../../store/store";
import { ITodosList } from "../../../types/ITodoList";
import CustomButtonGroup from "../../common/CustomButtonGroup";
import TodoListSearch from "./TodoListSearch";
import TodoListFilter from "./TodoListFilter";
import { deleteList, updateList } from "../../../store/slices/listSlice";
import CustomTextField from "../../common/CustomTextField";
import CheckIcon from "@mui/icons-material/Check";

type Props = {
  selectedList: ITodosList;
};

const StyledLink = styled(Link)({
  ":active": {
    textDecoration: "none",
  },
});

const TodoListHeader = (props: Props) => {
  const { selectedList } = props;
  const [editMode, setEditMode] = useState(false);
  const [name, setName] = useState(selectedList.name);
  const loading = useSelector((state: IRootStore) => state.list.loading);
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { listId } = useParams();

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    setName(e.target.value);
  };

  const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
    if (e.key === "Enter") {
      if (name.length === 0) {
        return;
      }

      updateTodoList();
    }
  };

  const updateTodoList = () => {
    setEditMode(false);

    const updatedList: ITodosList = {
      ...selectedList,
      name,
    };

    dispatch(updateList(updatedList));
  };

  const onDeleteList = () => {
    dispatch(deleteList(listId!));
    navigate("/list");
  };

  const editField = (
    <Box>
      <CustomTextField
        variant="standard"
        color="primary"
        error={name.trim() === ""}
        onChange={handleChange}
        onKeyDown={handleKeyDown}
        sx={{ "& .MuiInput-root": { fontSize: "2.125rem" }, marginRight: 2 }}
        value={name}
        required
        autoFocus
      />
      <IconButton aria-label="edit title" onClick={updateTodoList}>
        <CheckIcon />
      </IconButton>
    </Box>
  );

  return (
    <Box
      component="div"
      display="flex"
      justifyContent="space-between"
      mt={3}
      mb={2}
    >
      {editMode ? (
        editField
      ) : (
        <Box component="div" display="flex" alignItems="center">
          <Typography
            variant="h4"
            component="h2"
            align="left"
            pr={3}
            mt={1}
            display="inline-block"
            fontWeight={700}
          >
            {name}
          </Typography>
          <IconButton aria-label="edit title" onClick={() => setEditMode(true)}>
            <EditIcon />
          </IconButton>
        </Box>
      )}
      <Box display="flex">
        <TodoListFilter />
        <TodoListSearch />
        <CustomButtonGroup>
          <StyledLink to={`/list/${selectedList.id}/createTask`}>
            <CustomButton variant="contained" disabled={loading}>
              Add task
            </CustomButton>
          </StyledLink>
          <CustomButton
            variant="contained"
            color="error"
            onClick={onDeleteList}
            disabled={loading}
          >
            Delete list
          </CustomButton>
        </CustomButtonGroup>
      </Box>
    </Box>
  );
};

export default TodoListHeader;

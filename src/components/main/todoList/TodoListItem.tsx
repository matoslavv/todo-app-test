import styled from "@emotion/styled";
import { Box, IconButton, ListItem, Typography } from "@mui/material";
import CheckCircleOutlineIcon from "@mui/icons-material/CheckCircleOutline";
import CheckCircleIcon from "@mui/icons-material/CheckCircle";
import DeleteIcon from "@mui/icons-material/Delete";
import { ITask } from "../../../types/ITask";
import { useNavigate } from "react-router-dom";
import InfoIcon from "@mui/icons-material/Info";
import { useState } from "react";
import { deleteTask, updateTask } from "../../../store/slices/taskSlice";
import moment from "moment";
import { useAppDispatch } from "../../../store/store";
import { truncate } from "lodash";

type Props = {
  listId: string;
  task: ITask;
};

const StyledTask = styled(ListItem)({
  width: "100%",
  height: "65px",
  display: "flex",
  flexGrow: 1,
  alignItems: "center",
  justifyContent: "space-between",
  backgroundColor: "#F2F3F8",
  color: "black",
  listStyle: "none",
  padding: "20px 25px",
  margin: "7px 0",
  border: "2px solid transparent",
  transition: "all 0.2s",
  ":hover": {
    boxShadow: "1px 5px 9px -3px rgba(0,0,0,0.67)",
  },
});

const StyledDate = styled(Typography)((props: any) => ({
  color: props.theme.palette.secondary.dark,
}));

const TodoListItem = (props: Props) => {
  const { task, listId } = props;
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const [isChecked, setIsChecked] = useState(task.checked);

  const handleCheckClick = () => {
    setIsChecked((prevState) => !prevState);
    const updatedTask: ITask = {
      ...task,
      checked: !isChecked,
    };

    dispatch(updateTask({ listId, taskId: task.id, updatedTask }));
  };

  return (
    <StyledTask>
      <Box display="flex" alignItems="center">
        <IconButton
          aria-label="check"
          onClick={handleCheckClick}
          color={isChecked ? "success" : "default"}
        >
          {isChecked ? <CheckCircleIcon /> : <CheckCircleOutlineIcon />}
        </IconButton>
        <Box>
          <Typography variant="h6" component="h6" marginLeft={2}>
            {truncate(task.title, { length: 85 })}
          </Typography>
          <StyledDate variant="caption" component="span" marginLeft={2}>
            {moment(task.deadlineDate).format("llll")}
          </StyledDate>
        </Box>
      </Box>
      <Box>
        <IconButton
          aria-label="view"
          onClick={() => navigate(`/list/${listId}/task/${task.id}`)}
        >
          <InfoIcon />
        </IconButton>
        <IconButton
          aria-label="delete"
          onClick={() => dispatch(deleteTask({ listId, taskId: task.id }))}
        >
          <DeleteIcon />
        </IconButton>
      </Box>
    </StyledTask>
  );
};

export default TodoListItem;

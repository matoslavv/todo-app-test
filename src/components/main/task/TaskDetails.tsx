import styled from "@emotion/styled";
import {
  Box,
  Divider,
  List,
  ListItem,
  ListItemText,
  Typography,
} from "@mui/material";
import React, { useEffect } from "react";
import { useSelector } from "react-redux";
import { Link, useNavigate, useParams } from "react-router-dom";
import {
  deleteTask,
  getTask,
  taskActions,
} from "../../../store/slices/taskSlice";
import { IRootStore, useAppDispatch } from "../../../store/store";
import CustomButton from "../../common/CustomButton";
import CustomButtonGroup from "../../common/CustomButtonGroup";
import moment from "moment";
import Loading from "../../Loading";

const StyledLink = styled(Link)({
  ":active": {
    textDecoration: "none",
  },
});

const StyledList = styled(List)((props: any) => ({
  backgroundColor: props.theme.palette.secondary.light,
  color: "black",
  listStyle: "none",
  padding: "20px 25px",
  margin: "7px 0",
  border: "2px solid transparent",
}));

const TaskDetails = () => {
  const dispatch = useAppDispatch();
  const { listId, taskId } = useParams();
  const navigate = useNavigate();
  const selectedTask = useSelector(
    (state: IRootStore) => state.task.selectedTask
  );
  const loading = useSelector((state: IRootStore) => state.task.loading);

  useEffect(() => {
    if (listId && taskId) {
      dispatch(getTask({ listId, taskId }));
    }

    return () => {
      dispatch(taskActions.setSelectedTask(null));
    };
  }, [dispatch, listId, taskId]);

  const handleDelete = () => {
    if (listId && taskId) {
      dispatch(deleteTask({ listId, taskId }));
      navigate(`/list/${listId}`);
    }
  };

  if (loading || !selectedTask) {
    return <Loading />;
  }

  return (
    <>
      <Box
        component="div"
        display="flex"
        justifyContent="space-between"
        mt={3}
        mb={2}
      >
        <Typography
          variant="h4"
          component="h2"
          align="left"
          display="inline-block"
          fontWeight={700}
        >
          {selectedTask!.title}
        </Typography>
        <Box display="flex">
          <CustomButtonGroup>
            <StyledLink to={`/list/${listId}/editTask/${taskId}`}>
              <CustomButton variant="contained" disabled={false}>
                Edit task
              </CustomButton>
            </StyledLink>
            <CustomButton
              variant="contained"
              color="error"
              onClick={handleDelete}
              disabled={false}
            >
              Delete task
            </CustomButton>
          </CustomButtonGroup>
        </Box>
      </Box>
      <Divider />
      <Box mt={3}>
        <StyledList>
          <ListItem>
            <ListItemText primary="Title" secondary={selectedTask!.title} />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemText
              primary="Description"
              secondary={selectedTask!.description}
            />
          </ListItem>
          <Divider variant="inset" component="li" />
          <ListItem>
            <ListItemText
              primary="Deadline date"
              secondary={moment(selectedTask!.deadlineDate).format("llll")}
            />
          </ListItem>
        </StyledList>
      </Box>
    </>
  );
};

export default TaskDetails;

import { Collapse } from "@mui/material";
import { TransitionGroup } from "react-transition-group";
import TodoListItem from "./TodoListItem";
import List from "@mui/material/List";
import styled from "@emotion/styled";
import { ITask } from "../../../types/ITask";

type Props = {
  listId: string;
  tasks: ITask[];
};

const StyledList = styled(List)({
  width: "100%",
  marginTop: "24px",
  padding: "0",
});

const TodoListTasks = (props: Props) => {
  const { listId, tasks } = props;

  const taskList = tasks.map((task: ITask) => (
    <Collapse key={task.id}>
      <TodoListItem task={task} listId={listId} />
    </Collapse>
  ));

  return (
    <StyledList>
      <TransitionGroup>{taskList}</TransitionGroup>
    </StyledList>
  );
};

export default TodoListTasks;

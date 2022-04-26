import { Divider } from "@mui/material";
import { Fragment, useEffect } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { IRootStore, useAppDispatch } from "../../../store/store";
import TodoListTasks from "./TodoListTasks";
import TodoListHeader from "./TodoListHeader";
import { ITask } from "../../../types/ITask";
import { getList } from "../../../store/slices/listSlice";
import Loading from "../../Loading";

const TodoListDetails = () => {
  const dispatch = useAppDispatch();
  const { listId } = useParams();
  const selectedList = useSelector(
    (state: IRootStore) => state.list.selectedList
  );
  const loading = useSelector((state: IRootStore) => state.list.loading);

  useEffect(() => {
    if (!selectedList || selectedList!.id !== listId) {
      dispatch(getList(listId!));
    }
  }, [dispatch, listId, selectedList]);

  const searchTasks = (searchTerm: string, tasks: ITask[]) => {
    if (searchTerm.length > 0) {
      return tasks.filter((task) =>
        task.title.toLowerCase().includes(searchTerm.toLowerCase())
      );
    } else {
      return tasks;
    }
  };

  const tasks = useSelector((state: IRootStore): any => {
    const allTasks = state.task.tasks;
    const filter = state.task.filter;
    const searchTerm = state.task.searchTerm;

    if (filter === "all") {
      return searchTasks(searchTerm, allTasks);
    } else {
      switch (filter) {
        case "active":
          return searchTasks(
            searchTerm,
            allTasks.filter((task: ITask) => !task.checked)
          );
        case "done":
          return searchTasks(
            searchTerm,
            allTasks.filter((task: ITask) => task.checked)
          );
      }
    }
  });

  return (
    <Fragment>
      {loading || !selectedList ? (
        <Loading />
      ) : (
        <Fragment>
          <TodoListHeader selectedList={selectedList} />
          <Divider />
          <TodoListTasks listId={listId!} tasks={tasks} />
        </Fragment>
      )}
    </Fragment>
  );
};

export default TodoListDetails;

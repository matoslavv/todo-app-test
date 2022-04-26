import React, { useEffect } from "react";
import TheNavigation from "./components/header/TheNavigation";
import SideBar from "./components/main/sidebar/Sidebar";
import { Route, Routes } from "react-router-dom";
import TodoListDetails from "./components/main/todoList/TodoListDetails";
import TaskForm from "./components/form/TaskForm";
import { Box } from "@mui/system";
import TaskDetails from "./components/main/task/TaskDetails";
import { getLists } from "./store/slices/listSlice";
import { useAppDispatch } from "./store/store";
import Welcome from "./components/Welcome";

function App() {
  const dispatch = useAppDispatch();

  useEffect(() => {
    dispatch(getLists());
  }, [dispatch]);

  return (
    <Box display="flex">
      <TheNavigation />
      <SideBar />
      <Box
        component="main"
        sx={{
          flexGrow: 1,
          p: 5,
          mt: 5,
          width: { sm: `calc(100% - 220px)` },
        }}
      >
        <Routes>
          <Route path="/list/:listId" element={<TodoListDetails />} />
          <Route path="/list/:listId/task/:taskId" element={<TaskDetails />} />
          <Route path="/list/:listId/createTask" element={<TaskForm />} />
          <Route path="/list/:listId/editTask/:taskId" element={<TaskForm />} />
          <Route path="*" element={<Welcome />} />
        </Routes>
      </Box>
    </Box>
  );
}

export default App;

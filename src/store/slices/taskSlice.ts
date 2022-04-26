import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { ITask, ITaskForm } from "../../types/ITask";

export interface ITaskSlice {
  loading: boolean;
  submitting: boolean;
  tasks: ITask[];
  selectedTask: null | ITask;
  filter: string;
  searchTerm: string;
}

const initialState: ITaskSlice = {
  loading: false,
  submitting: false,
  tasks: [],
  selectedTask: null,
  filter: "all",
  searchTerm: "",
};

export interface IListTaskIdBody {
  listId: string;
  taskId: string;
}

interface ICreateTaskBody {
  listId: string;
  newTask: ITaskForm;
}

interface IUpdateTaskBody {
  listId: string;
  taskId: string;
  updatedTask: ITaskForm;
}

export const getTask = createAsyncThunk(
  "getTask",
  async (body: IListTaskIdBody, thunkAPI) => {
    thunkAPI.dispatch(taskActions.setLoading(true));
    agent.task
      .detail(body.listId, body.taskId)
      .then((response) =>
        thunkAPI.dispatch(taskActions.setSelectedTask(response))
      )
      .finally(() => thunkAPI.dispatch(taskActions.setLoading(false)));
  }
);

export const createTask = createAsyncThunk(
  "createTask",
  async (body: ICreateTaskBody, thunkAPI) => {
    thunkAPI.dispatch(taskActions.setLoading(true));
    agent.task
      .create(body.listId, body.newTask)
      .then((response) => thunkAPI.dispatch(taskActions.addTask(response)))
      .finally(() => thunkAPI.dispatch(taskActions.setLoading(false)));
  }
);

export const updateTask = createAsyncThunk(
  "updateTask",
  async (body: IUpdateTaskBody, thunkAPI) => {
    thunkAPI.dispatch(taskActions.setLoading(true));
    agent.task
      .update(body.listId, body.taskId, body.updatedTask)
      .then((response) => {
        thunkAPI.dispatch(
          taskActions.updateTask({
            taskId: body.taskId,
            updatedTask: body.updatedTask,
          })
        );
        thunkAPI.dispatch(taskActions.setSelectedTask(response));
      })
      .finally(() => thunkAPI.dispatch(taskActions.setLoading(false)));
  }
);
export const deleteTask = createAsyncThunk(
  "deleteTask",
  async (body: IListTaskIdBody, thunkAPI) => {
    thunkAPI.dispatch(taskActions.setLoading(true));
    agent.task
      .delete(body.listId, body.taskId)
      .then(() => {
        thunkAPI.dispatch(taskActions.deleteTask(body.taskId));
        thunkAPI.dispatch(taskActions.setSelectedTask(null));
      })
      .finally(() => thunkAPI.dispatch(taskActions.setLoading(false)));
  }
);

export const taskSlice = createSlice({
  name: "task",
  initialState,
  reducers: {
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSubmitting(state, action) {
      state.submitting = action.payload;
    },
    addTasks(state, action) {
      state.tasks = action.payload;
    },
    addTask(state, action) {
      state.tasks = [...state.tasks, action.payload];
    },
    deleteTask(state, action) {
      state.tasks = state.tasks.filter(
        (task: ITask) => task.id !== action.payload
      );
    },
    updateTask(state, action) {
      const oldTasks = state.tasks.filter(
        (task: ITask) => task.id !== action.payload.taskId
      );
      state.tasks = [...oldTasks, action.payload.updatedTask];
    },
    setSelectedTask(state, action) {
      state.selectedTask = action.payload;
    },
    setFilter(state, action) {
      state.filter = action.payload;
    },
    setSearchTerm(state, action) {
      state.searchTerm = action.payload;
    },
  },
});

export const taskActions = taskSlice.actions;

export default taskSlice.reducer;

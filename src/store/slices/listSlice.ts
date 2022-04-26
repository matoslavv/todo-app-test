import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";
import agent from "../../api/agent";
import { ITodosList, ITodosListForm } from "../../types/ITodoList";
import { taskActions } from "./taskSlice";

export interface IListSlice {
  lists: ITodosList[];
  selectedList: ITodosList | null;
  loading: boolean;
  submitting: boolean;
}

const initialState: IListSlice = {
  lists: [],
  selectedList: null,
  loading: false,
  submitting: false,
};

export const getLists = createAsyncThunk("getLists", async (_, thunkAPI) => {
  thunkAPI.dispatch(listActions.setLoading(true));
  agent.list
    .get()
    .then((response) => thunkAPI.dispatch(listActions.addLists(response)))
    .finally(() => thunkAPI.dispatch(listActions.setLoading(false)));
});

export const getList = createAsyncThunk(
  "getList",
  async (id: string, thunkAPI) => {
    thunkAPI.dispatch(listActions.setLoading(true));
    agent.list
      .detail(id)
      .then((response) => {
        thunkAPI.dispatch(listActions.setSelectedList(response));
        thunkAPI.dispatch(taskActions.addTasks(response.tasks));
      })
      .finally(() => thunkAPI.dispatch(listActions.setLoading(false)));
  }
);

export const createList = createAsyncThunk(
  "createList",
  async (newList: ITodosListForm, thunkAPI) => {
    thunkAPI.dispatch(listActions.setSubmitting(true));
    agent.list
      .create(newList)
      .then((response) => thunkAPI.dispatch(listActions.addList(response)))
      .finally(() => thunkAPI.dispatch(listActions.setSubmitting(false)));
  }
);

export const updateList = createAsyncThunk(
  "updateList",
  async (updatedList: ITodosList, thunkAPI) => {
    thunkAPI.dispatch(listActions.setLoading(true));
    agent.list
      .update(updatedList.id, updatedList)
      .then(() => {
        thunkAPI.dispatch(listActions.setSelectedList(updatedList));
        thunkAPI.dispatch(listActions.updateList(updatedList));
      })
      .finally(() => thunkAPI.dispatch(listActions.setLoading(false)));
  }
);

export const deleteList = createAsyncThunk(
  "deleteList",
  async (listId: string, thunkAPI) => {
    thunkAPI.dispatch(listActions.setLoading(true));
    agent.list
      .delete(listId)
      .then(() => thunkAPI.dispatch(listActions.deleteList(listId)))
      .finally(() => thunkAPI.dispatch(listActions.setLoading(false)));
  }
);

const listSlice = createSlice({
  name: "list",
  initialState,
  reducers: {
    createList(state, action) {
      state.lists.push(action.payload);
    },
    deleteList(state, action) {
      state.lists = state.lists.filter(
        (list: ITodosList) => list.id !== action.payload
      );
    },
    addLists(state, action) {
      state.lists = action.payload;
    },
    addList(state, action) {
      state.lists = [...state.lists, action.payload];
    },
    updateList(state, action) {
      const oldLists = state.lists.filter(
        (list: ITodosList) => list.id !== action.payload.id
      );
      state.lists = [...oldLists, action.payload];
    },
    setSelectedList(state, action) {
      state.selectedList = action.payload;
    },
    setLoading(state, action) {
      state.loading = action.payload;
    },
    setSubmitting(state, action) {
      state.submitting = action.payload;
    },
  },
});

export const listActions = listSlice.actions;

export default listSlice.reducer;

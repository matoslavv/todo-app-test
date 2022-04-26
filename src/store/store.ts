import { configureStore } from "@reduxjs/toolkit";
import listSlice, { IListSlice } from "./slices/listSlice";
import taskSlice, { ITaskSlice } from "./slices/taskSlice";
import thunkMiddleware from "redux-thunk";
import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";

export interface IRootStore {
  list: IListSlice;
  task: ITaskSlice;
}

const store = configureStore({
  reducer: {
    list: listSlice,
    task: taskSlice,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({ immutableCheck: { warnAfter: 200 } }).concat(
      thunkMiddleware
    ),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

export const useAppDispatch = () => useDispatch<AppDispatch>();
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

export default store;

import { ITask } from "./ITask";

export interface IList {
  lists: ITodosList[];
}

export interface ITodosList extends ITodosListForm {
  id: string;
}

export interface ITodosListForm {
  name: string;
  tasks: ITask[];
}

export interface ITaskForm {
  title: string;
  description: string;
  deadlineDate: string;
}

export interface ITask extends ITaskForm {
  id: string;
  checked: boolean;
}

export class TaskFormValues implements ITaskForm {
  title = "";
  description = "";
  deadlineDate = new Date().toISOString().split(".")[0];

  constructor(init?: ITaskForm) {
    Object.assign(this, init);
  }
}

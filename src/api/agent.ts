import axios, { AxiosResponse } from "axios";
import { ITaskForm } from "../types/ITask";
import { ITodosList, ITodosListForm } from "../types/ITodoList";

axios.defaults.baseURL = "https://62616911327d3896e27b7285.mockapi.io/api";

var responseBody = (responseBody: AxiosResponse) => responseBody.data;

var requests = {
  get: (url: string) => axios.get(url).then(responseBody),
  post: (url: string, body: any) => axios.post(url, body).then(responseBody),
  delete: (url: string) => axios.delete(url).then(responseBody),
  update: (url: string, body: any) =>
    axios.put(url, body).then().then(responseBody),
};

var list = {
  get: () => requests.get("/list"),
  detail: (id: string) => requests.get(`/list/${id}`),
  create: (body: ITodosListForm) => requests.post("/list", body),
  delete: (id: string) => requests.delete(`/list/${id}`),
  update: (id: string, body: ITodosList) =>
    requests.update(`/list/${id}`, body),
};

var task = {
  get: (listId: string) => requests.get(`/list/${listId}/task`),
  detail: (listId: string, id: string) =>
    requests.get(`/list/${listId}/task/${id}`),
  create: (listId: string, body: ITaskForm) =>
    requests.post(`/list/${listId}/task`, body),
  delete: (listId: string, id: string) =>
    requests.delete(`/list/${listId}/task/${id}`),
  update: (listId: string, id: string, body: ITaskForm) =>
    requests.update(`/list/${listId}/task/${id}`, body),
};

export default { list, task };

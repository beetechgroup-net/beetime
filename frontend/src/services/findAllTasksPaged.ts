import {Task} from "@/interfaces/Task";
import {api} from "@/lib/api";

export async function findAllTasksPaged(page: number, size: number): Promise<Task[]> {
  return await api.get(`/tasks?page=${page}&size=${size}`).then((response) => response.data);
}
import {Task} from "@/interfaces/Task";
import {api} from "@/lib/api";

export async function startTask(task: Task): Promise<Task[]> {
  return await api.put(`/tasks/${task.id}/start`).then((response) => response.data);
}
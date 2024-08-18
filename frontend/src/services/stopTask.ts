import {Task} from "@/interfaces/Task";
import {api} from "@/lib/api";

export async function stopTask(task: Task): Promise<Task[]> {
  return await api.put(`/tasks/${task.id}/stop`).then((response) => response.data);
}
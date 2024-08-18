import {api} from "@/lib/api";

export function createNewTask(data: any) {
    return api.post("/tasks", data)
}
import {TaskStatus} from "@/app/interfaces/TaskStatus";

export interface Task {
  id: number;
  description: string;
  category: string;
  status: TaskStatus;
  startTime?: string;
  stopTime?: string;
  duration: number;
}
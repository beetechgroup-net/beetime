import {TaskStatus} from "@/app/interfaces/TaskStatus";
import {Category} from "@/app/interfaces/Category";

export interface Task {
  id: string;
  description: string;
  category: Category;
  status: TaskStatus;
  startTime?: string;
  stopTime?: string;
  duration: number;
}
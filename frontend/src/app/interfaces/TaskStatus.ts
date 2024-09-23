export enum TaskStatus {
  NOT_STARTED = "NOT_STARTED",
  STARTED = "STARTED",
  STOPPED = "STOPPED"
}

const TaskStatusBeautifyMap: Record<TaskStatus, string> = {
  [TaskStatus.NOT_STARTED]: "Not Started",
  [TaskStatus.STARTED]: "Started",
  [TaskStatus.STOPPED]: "Stopped"
};

export function prettify(status: TaskStatus): string {
  return TaskStatusBeautifyMap[status];
}

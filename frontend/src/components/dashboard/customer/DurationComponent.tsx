import {Task} from "@/interfaces/Task";
import dayjs from "@/lib/dayjs";
import {useEffect, useState} from "react";
import {TaskStatus} from "@/interfaces/TaskStatus";

interface DurationComponentProps {
  task: Task;
}

function calculateDuration(row: Task) {
  let duration = 0;

  if (row.status === TaskStatus.STARTED) {
    duration = dayjs.duration(row.duration).asMilliseconds() + dayjs.duration(dayjs().diff(dayjs(row.startTime), "millisecond")).asMilliseconds()
  }

  else if (row.status === TaskStatus.STOPPED) {
    duration = dayjs.duration(row.duration).asMilliseconds()
  }

  return dayjs.duration(duration).format("DD:HH:mm:ss")
}

export function DurationComponent({task}: DurationComponentProps) {
  const [duration, setDuration] = useState(calculateDuration(task));

  // Third Attempts
  useEffect(() => {
    if (TaskStatus.STOPPED !== task.status) {
      const timer = setInterval(() => setDuration(calculateDuration(task)), 1000);
      return () => clearInterval(timer);
    }
  }, [task]);

  return (
      <>
        {duration}
      </>
  );
}
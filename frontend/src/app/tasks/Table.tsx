// "use client";
// import {GridColDef, GridOverlay} from "@mui/x-data-grid";
// import * as React from "react";
//
// export default function Table() {
//   const {tasks, fetchTasks, loading, error} = useTasks();
//
//   const columns: GridColDef<(typeof tasks)[number]>[] = [
//     {
//       field: 'id',
//       headerName: 'ID',
//       width: 90,
//       type: "number",
//     },
//     {
//       field: 'description',
//       headerName: 'Description',
//       width: 150,
//       editable: true,
//     },
//     {
//       field: 'category',
//       headerName: 'Category',
//       width: 150,
//       editable: true,
//     },
//     {
//       field: 'status',
//       headerName: 'Status',
//       width: 110,
//       editable: true,
//     },
//     {
//       field: 'startTime',
//       headerName: 'Start Time',
//       sortable: false,
//       width: 160,
//     },
//     {
//       field: 'stopTime',
//       headerName: 'Stop Time',
//       sortable: false,
//       width: 160,
//     },
//     {
//       field: 'duration',
//       headerName: 'Duration',
//       sortable: false,
//       width: 160,
//     },
//   ];
//
//   return (
//
//       (tasks.length === 0) ? (
//           tasks.map((task) => (
//               <div key={task.id}>
//                 <div>{task.id}</div>
//                 <div>{task.description}</div>
//                 <div>{task.category}</div>
//                 <div>{task.status}</div>
//                 <div>{task.startTime}</div>
//                 <div>{task.stopTime}</div>
//                 <div>{task.duration}</div>
//               </div>
//           ))
//       ) : (
//           <div>Loading...</div>
//       ))
// }
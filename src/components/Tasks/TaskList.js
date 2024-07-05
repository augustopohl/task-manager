import React, { useContext } from "react";
import TaskItem from "./TaskItem";
import { DataContext } from "../../context/DataContext";

const TaskList = ({ onEdit }) => {
  const { tasks } = useContext(DataContext);

  return (
    <ul className="space-y-4">
      {tasks?.map((task) => (
        <TaskItem key={task.id} task={task} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default TaskList;

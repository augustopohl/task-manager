import React, { useState, useContext } from "react";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";
import { DataContext } from "../context/DataContext";

const Tasks = () => {
  const [editTask, setEditTask] = useState(null);
  const { tasks } = useContext(DataContext);

  const handleEdit = (task) => {
    setEditTask(task);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl font-bold mb-4">Tarefas</h2>
      <TaskForm editTask={editTask} setEditTask={setEditTask} />
      <TaskList tasks={tasks} onEdit={handleEdit} />
    </div>
  );
};

export default Tasks;

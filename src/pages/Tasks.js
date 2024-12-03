import React, { useState, useContext } from "react";
import TaskList from "../components/Tasks/TaskList";
import TaskForm from "../components/Tasks/TaskForm";
import { DataContext } from "../context/DataContext";

const Tasks = () => {
  const [editTask, setEditTask] = useState(null);
  const [showForm, setShowForm] = useState(false);
  const { tasks } = useContext(DataContext);

  const handleEdit = (task) => {
    setEditTask(task);
    setShowForm(true);
  };

  const handleCreate = () => {
    setEditTask(null);
    setShowForm(true);
  };

  const handleFormClose = () => {
    setShowForm(false);
  };

  return (
    <div className="container mx-auto p-4 relative">
      <h2 className="text-2xl font-bold mb-4">Tarefas</h2>

      {showForm ? (
        <TaskForm
          editTask={editTask}
          setEditTask={setEditTask}
          onClose={handleFormClose}
        />
      ) : (
        <TaskList tasks={tasks} onEdit={handleEdit} />
      )}

      {!showForm && (
        <button
          onClick={handleCreate}
          className="fixed bottom-4 right-4 bg-purple-500 hover:bg-purple-700 text-white font-bold rounded-full w-12 h-12 flex items-center justify-center shadow-lg"
        >
          +
        </button>
      )}
    </div>
  );
};

export default Tasks;

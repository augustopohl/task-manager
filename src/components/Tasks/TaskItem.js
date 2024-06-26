import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const TaskItem = ({ task, onEdit }) => {
  const { removeTask } = useContext(DataContext);

  const handleDelete = () => {
    removeTask(task.id);
  };

  return (
    <li className="bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <p>Status: {task.status}</p>
      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(task)}
          className="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-bold py-2 px-4 rounded"
        >
          Excluir
        </button>
      </div>
    </li>
  );
};

export default TaskItem;

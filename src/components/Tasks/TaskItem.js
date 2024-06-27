import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const TaskItem = ({ task, onEdit }) => {
  const { removeTask, categories } = useContext(DataContext);
  const category = categories.find((cat) => cat.id === task.categoryId);

  const handleDelete = () => {
    removeTask(task.id);
  };

  return (
    <li className="bg-white text-gray-700 shadow-md rounded-lg px-8 pt-6 pb-8 mb-4">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <p>{task.description}</p>
      <div className="flex flex-col my-2">
        <p>Status: {task.status}</p>
        <p>Categoria: {category.name}</p>
      </div>
      <div className="space-x-4">
        <button
          onClick={() => onEdit(category)}
          className="border-[#D4D4D8] border-2 hover:bg-violet-100 text-[#3F3F46] text-sm font-semibold py-1 px-4 rounded-lg"
        >
          Editar
        </button>
        <button
          onClick={handleDelete}
          className="bg-red-500 hover:bg-red-700 text-white font-semibold py-1 px-4 text-sm rounded-lg"
        >
          Excluir
        </button>
      </div>
    </li>
  );
};

export default TaskItem;

import React, { useContext, useRef } from "react";
import { DataContext } from "../../context/DataContext";

const TaskItem = ({ task, onEdit }) => {
  const { removeTask } = useContext(DataContext);

  // Mapeamento de categorias para cores
  const colorMap = useRef({});

  const handleDelete = () => {
    removeTask(task.id);
  };

  const getStatusText = (status) => {
    switch (status) {
      case 0:
        return "Em progresso";
      case 1:
        return "Finalizado";
      case 2:
        return "Pendente";
      default:
        return "Desconhecido";
    }
  };

  const getPriorityText = (priority) => {
    switch (priority) {
      case 0:
        return "Baixa";
      case 1:
        return "Média";
      case 2:
        return "Alta";
      default:
        return "Desconhecida";
    }
  };

  const getPriorityColor = (priority) => {
    switch (priority) {
      case 0:
        return "bg-green-500"; // Baixa prioridade
      case 1:
        return "bg-yellow-500"; // Média prioridade
      case 2:
        return "bg-red-500"; // Alta prioridade
      default:
        return "bg-gray-500"; // Prioridade desconhecida
    }
  };

  const getRandomColor = () => {
    const colors = [
      "#4CAF50", // Verde
      "#F44336", // Vermelho
      "#2196F3", // Azul
      "#FFC107", // Amarelo
      "#9C27B0", // Roxo
      "#FF5722", // Laranja
      "#795548", // Marrom
      "#607D8B", // Cinza
    ];
    return colors[Math.floor(Math.random() * colors.length)];
  };

  const getCategoryColor = (categoryName) => {
    // Gera uma cor se a categoria não estiver no mapa
    if (!colorMap.current[categoryName]) {
      colorMap.current[categoryName] = getRandomColor();
    }
    // Retorna a cor correspondente
    return colorMap.current[categoryName];
  };

  return (
    <li className="bg-white text-gray-700 shadow-md rounded-lg px-8 pt-4 pb-6 mb-2">
      <h3 className="text-xl font-bold">{task.title}</h3>
      <div className="flex flex-col my-1 gap-1">
        <p className="text-gray-400">{task.description}</p>
        <p>Status: {getStatusText(task.status)}</p>
        <p className="flex items-center gap-2">
          Prioridade:{" "}
          <span
            className={`px-3 py-1 rounded-full text-white text-sm font-semibold ${getPriorityColor(
              task.priority
            )}`}
          >
            {getPriorityText(task.priority)}
          </span>
        </p>
        <div className="flex flex-wrap items-center gap-2 my-1">
          {task.categories_list?.map((category, index) =>
            category ? (
              <span
                key={index}
                className="px-3 py-1 rounded-full text-white text-sm font-semibold"
                style={{ backgroundColor: getCategoryColor(category.name) }}
              >
                #{category.name}
              </span>
            ) : (
              <span key={index}>Sem categoria</span>
            )
          )}
        </div>
      </div>
      <div className="space-x-4 mt-2">
        <button
          onClick={() => onEdit(task)}
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

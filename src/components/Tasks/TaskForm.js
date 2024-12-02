import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";

const TaskForm = ({ editTask, setEditTask }) => {
  const {
    createTask,
    editTask: updateTask,
    categories,
  } = useContext(DataContext);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState(0); // Estado para a prioridade
  const [selectedCategories, setSelectedCategories] = useState([]);

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setStatus(
        editTask.status === 0
          ? "in progress"
          : editTask.status === 1
          ? "completed"
          : "pending"
      );
      setPriority(editTask.priority || 0);
      setSelectedCategories(editTask.categories || []);
    }
  }, [editTask]);

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) =>
      Number(option.value)
    );
    setSelectedCategories(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      status: status === "in progress" ? 0 : status === "completed" ? 1 : 2,
      priority, // Adicionando a prioridade no payload
      description: "asdasdasdas",
      categories: selectedCategories,
      created_at: new Date().toISOString(),
    };

    try {
      if (editTask) {
        await updateTask(editTask.id, newTask);
        setEditTask(null);
      } else {
        await createTask(newTask);
      }
      setTitle("");
      setStatus("pending");
      setPriority(0); // Resetando a prioridade
      setSelectedCategories([]);
    } catch (error) {
      console.error("Error submitting task:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-md rounded-lg px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Título
        </label>
        <input
          type="text"
          placeholder="Digite um título para a tarefa"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        />
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Status
        </label>
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="pending">Pendente</option>
          <option value="in progress">Em progresso</option>
          <option value="completed">Finalizada</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Prioridade
        </label>
        <select
          value={priority}
          onChange={(e) => setPriority(Number(e.target.value))}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value={0}>Baixa</option>
          <option value={1}>Média</option>
          <option value={2}>Alta</option>
        </select>
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Categorias
        </label>
        <select
          multiple
          value={selectedCategories}
          onChange={handleCategoryChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
        <small className="text-gray-500">
          Segure Ctrl ou Command para selecionar múltiplas categorias
        </small>
      </div>

      <button
        type="submit"
        className="bg-[#7C3AED] hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg text-sm"
      >
        {editTask ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
};

export default TaskForm;

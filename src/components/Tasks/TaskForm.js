import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";

const TaskForm = ({ editTask, setEditTask, onClose }) => {
  const {
    createTask,
    editTask: updateTask,
    categories,
    users,
  } = useContext(DataContext);
  const { currentUser } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [status, setStatus] = useState("pending");
  const [priority, setPriority] = useState(0);
  const [selectedCategories, setSelectedCategories] = useState([]);
  const [selectedUsers, setSelectedUsers] = useState([]);
  const [description, setDescription] = useState("");

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
      setSelectedUsers(editTask.responsibles?.map((res) => res.id) || []);
      setDescription(editTask.description || "");
    }
  }, [editTask]);

  const handleCategoryChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) =>
      Number(option.value)
    );
    setSelectedCategories(selectedOptions);
  };

  const handleUserChange = (e) => {
    const selectedOptions = Array.from(e.target.selectedOptions).map((option) =>
      Number(option.value)
    );
    setSelectedUsers(selectedOptions);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (selectedUsers.length === 0) {
      alert("Selecione ao menos um responsável!");
      return;
    }

    const newTask = {
      id: editTask ? editTask.id : null,
      title,
      status: status === "in progress" ? 0 : status === "completed" ? 1 : 2,
      priority,
      description,
      categories: selectedCategories,
      user_id: currentUser?.userId || null,
      responsibles: selectedUsers,
      created_at: new Date().toISOString(),
    };

    console.log(editTask);

    try {
      if (editTask) {
        await updateTask(newTask);
        setEditTask(null);
      } else {
        await createTask(newTask);
      }
      setTitle("");
      setStatus("pending");
      setPriority(0);
      setDescription("");
      setSelectedCategories([]);
      setSelectedUsers([]);
      if (onClose) onClose();
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
          Descrição
        </label>
        <textarea
          placeholder="Digite uma descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
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
      </div>

      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Responsáveis
        </label>
        <select
          multiple
          value={selectedUsers}
          onChange={handleUserChange}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          {users?.map((user) => (
            <option key={user.id} value={user.id}>
              {user.name || user.username}
            </option>
          ))}
        </select>
      </div>

      <div className="space-x-4 mt-4">
        <button
          type="submit"
          className="bg-[#7C3AED] hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg"
        >
          {editTask ? "Atualizar" : "Adicionar"}
        </button>
        <button
          type="button"
          onClick={onClose}
          className="bg-gray-300 hover:bg-gray-400 text-gray-700 font-semibold py-2 px-4 rounded-lg"
        >
          Cancelar
        </button>
      </div>
    </form>
  );
};

export default TaskForm;

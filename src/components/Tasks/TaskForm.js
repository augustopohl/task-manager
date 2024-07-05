import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";
import { AuthContext } from "../../context/AuthContext";

const TaskForm = ({ editTask, setEditTask }) => {
  const {
    createTask,
    editTask: updateTask,
    categories,
  } = useContext(DataContext);
  const { currentUser } = useContext(AuthContext);

  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const [status, setStatus] = useState("pending");
  const [categoryId, setCategoryId] = useState("");

  useEffect(() => {
    if (editTask) {
      setTitle(editTask.title);
      setDescription(editTask.description);
      setStatus(editTask.status);
      setCategoryId(editTask.categoryId);
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      description,
      status,
      userId: currentUser.id, // Ensure this is correctly set, or dynamically fetch the current user ID
      createdAt: new Date().toISOString(), // Ensure dates are formatted correctly
      finishedAt: status === "completed" ? new Date().toISOString() : null,
      categoryId: parseInt(categoryId),
    };

    try {
      if (editTask) {
        await updateTask(editTask.id, newTask);
        setEditTask(null);
      } else {
        await createTask(newTask);
      }
      // Clear form fields
      setTitle("");
      setDescription("");
      setStatus("pending");
      setCategoryId("");
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
          placeholder="Insira uma descrição"
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
          Categoria
        </label>
        <select
          value={categoryId}
          onChange={(e) => setCategoryId(e.target.value)}
          className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline"
        >
          <option value="">Selecione uma categoria</option>
          {categories?.map((category) => (
            <option key={category.id} value={category.id}>
              {category.name}
            </option>
          ))}
        </select>
      </div>
      <button
        type="submit"
        className="bg-[#7C3AED] hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg text-sm "
      >
        {editTask ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
};

export default TaskForm;

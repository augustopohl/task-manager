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
  const [status, setStatus] = useState("pending");
  const [categoryId, setCategoryId] = useState("");

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
      setCategoryId(editTask.categoryId);
    }
  }, [editTask]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newTask = {
      title,
      status: status === "in progress" ? 0 : status === "completed" ? 1 : 2,
      userId: currentUser.id,
      createdAt: new Date().toISOString(),
      finishedAt: status === "completed" ? new Date().toISOString() : null,
      categoryId: parseInt(categoryId),
    };

    console.log("Submitting Task Payload: ", newTask);

    try {
      if (editTask) {
        await updateTask(editTask.id, newTask);
        setEditTask(null);
      } else {
        await createTask(newTask);
      }
      setTitle("");
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
        className="bg-[#7C3AED] hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg text-sm"
      >
        {editTask ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
};

export default TaskForm;

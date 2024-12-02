import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";

const CategoryForm = ({ editCategory, setEditCategory }) => {
  const { createCategory, editCategory: updateCategory } =
    useContext(DataContext);
  const [name, setName] = useState("");
  const [description, setDescription] = useState("");

  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name);
    }
  }, [editCategory]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const newCategory = {
      name,
      description,
    };

    try {
      // if (editCategory) {
      //   await updateCategory(editCategory.id, newCategory);
      //   setEditCategory(null);
      // } else {
      await createCategory(newCategory);
      // }
      setName("");
    } catch (error) {
      console.error("Error submitting category:", error);
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm border-[#E4E4E7] border-2 rounded-lg px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4 flex flex-col gap-2">
        <label className="block text-gray-700 text-sm font-bold">
          Nome da categoria
        </label>
        <input
          type="text"
          placeholder="Digite o nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus:outline-none focus:shadow-outline"
        />

        <label className="block text-gray-700 text-sm font-bold">
          Descrição
        </label>
        <textarea
          placeholder="Digite uma descrição"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-[#7C3AED] hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg text-sm focus:outline-none focus:shadow-outline"
      >
        {editCategory ? "Atualizar" : "Adicionar"}
      </button>
    </form>
  );
};

export default CategoryForm;

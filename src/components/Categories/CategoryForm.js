import React, { useState, useEffect, useContext } from "react";
import { DataContext } from "../../context/DataContext";

const CategoryForm = ({ editCategory, setEditCategory }) => {
  const { createCategory, editCategory: updateCategory } =
    useContext(DataContext);
  const [name, setName] = useState("");

  useEffect(() => {
    if (editCategory) {
      setName(editCategory.name);
    }
  }, [editCategory]);

  const handleSubmit = (e) => {
    e.preventDefault();
    const newCategory = {
      name,
      userId: 1, // Assuming user ID 1 for now
    };

    if (editCategory) {
      updateCategory(editCategory.id, newCategory);
      setEditCategory(null);
    } else {
      createCategory(newCategory);
    }

    setName("");
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-sm border-[#E4E4E7] border-2 rounded-lg px-8 pt-6 pb-8 mb-4"
    >
      <div className="mb-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">
          Nome da categoria
        </label>
        <input
          type="text"
          placeholder="Digite o nome da categoria"
          value={name}
          onChange={(e) => setName(e.target.value)}
          className="focus:outline-none focus:shadow-outline"
        />
      </div>
      <button
        type="submit"
        className="bg-[#7C3AED] hover:bg-violet-700 text-white font-semibold py-2 px-4 rounded-lg text-sm focus:outline-none focus:shadow-outline"
      >
        Adicionar
      </button>
    </form>
  );
};

export default CategoryForm;

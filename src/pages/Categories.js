import React, { useState, useContext } from "react";
import CategoryForm from "../components/Categories/CategoryForm";
import CategoryList from "../components/Categories/CategoryList";
import { DataContext } from "../context/DataContext";

const Categories = () => {
  const [editCategory, setEditCategory] = useState(null);
  const { categories } = useContext(DataContext);

  const handleEdit = (category) => {
    setEditCategory(category);
  };

  return (
    <div className="container mx-auto p-4">
      <h2 className="text-2xl text-[#18181B] font-medium mb-4">Categorias</h2>
      <CategoryForm
        editCategory={editCategory}
        setEditCategory={setEditCategory}
      />
      <CategoryList categories={categories} onEdit={handleEdit} />
    </div>
  );
};

export default Categories;

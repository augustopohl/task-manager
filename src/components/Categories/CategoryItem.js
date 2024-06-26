import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const CategoryItem = ({ category, onEdit }) => {
  const { removeCategory } = useContext(DataContext);

  const handleDelete = () => {
    removeCategory(category.id);
  };

  return (
    <li className="bg-white shadow-sm border-[#E4E4E7] rounded-lg px-8 pt-6 pb-8 mb-4 flex justify-between items-center">
      <span className="text-xl font-bold">{category.name}</span>
      <div className="flex space-x-4">
        <button
          onClick={() => onEdit(category)}
          className="border-[#D4D4D8] border-2 hover:bg-violet-100 text-[#3F3F46] text-sm font-semibold py-2 px-4 rounded-lg"
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

export default CategoryItem;

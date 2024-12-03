import React, { useContext } from "react";
import { DataContext } from "../../context/DataContext";

const CategoryItem = ({ category, onEdit }) => {
  const { removeCategory } = useContext(DataContext);

  console.log(category);

  const handleDelete = async () => {
    if (
      window.confirm(
        `Tem certeza de que deseja excluir a categoria "${category.name}"?`
      )
    ) {
      try {
        await removeCategory(category.id);
        console.log("Categoria excluída com sucesso!");
      } catch (error) {
        console.error("Erro ao excluir categoria:", error);
        alert("Erro ao excluir categoria. Tente novamente.");
      }
    }
  };

  return (
    <li className="bg-white shadow-sm border-[#E4E4E7] rounded-lg px-8 pt-6 pb-8 mb-4 flex justify-between items-center">
      <div className="flex flex-col gap-2">
        <span className="text-xl font-bold">{category.name}</span>
        <span className="text-md">{category.description}</span>
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
          className="bg-red-500 hover:bg-red-700 text-white text-sm font-semibold py-1 px-4 rounded-lg"
        >
          Excluir
        </button>
      </div>
    </li>
  );
};

export default CategoryItem;

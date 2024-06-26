import React, { useContext } from "react";
import CategoryItem from "./CategoryItem";
import { DataContext } from "../../context/DataContext";

const CategoryList = ({ onEdit }) => {
  const { categories } = useContext(DataContext);

  return (
    <ul className="space-y-4">
      {categories.map((category) => (
        <CategoryItem key={category.id} category={category} onEdit={onEdit} />
      ))}
    </ul>
  );
};

export default CategoryList;

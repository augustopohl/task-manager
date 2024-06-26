import React, { createContext, useState } from "react";
import {
  tasks as mockTasks,
  categories as mockCategories,
  addTask,
  updateTask,
  deleteTask,
  addCategory,
  updateCategory,
  deleteCategory,
} from "../mockData";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState(mockTasks);
  const [categories, setCategories] = useState(mockCategories);

  const createTask = (task) => {
    addTask(task);
    setTasks([...tasks, task]);
  };

  const editTask = (id, updatedTask) => {
    updateTask(id, updatedTask);
    setTasks(tasks.map((task) => (task.id === id ? updatedTask : task)));
  };

  const removeTask = (id) => {
    deleteTask(id);
    setTasks(tasks.filter((task) => task.id !== id));
  };

  const createCategory = (category) => {
    addCategory(category);
    setCategories([...categories, category]);
  };

  const editCategory = (id, updatedCategory) => {
    updateCategory(id, updatedCategory);
    setCategories(
      categories.map((category) =>
        category.id === id ? updatedCategory : category
      )
    );
  };

  const removeCategory = (id) => {
    deleteCategory(id);
    setCategories(categories.filter((category) => category.id !== id));
  };

  return (
    <DataContext.Provider
      value={{
        tasks,
        categories,
        createTask,
        editTask,
        removeTask,
        createCategory,
        editCategory,
        removeCategory,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };

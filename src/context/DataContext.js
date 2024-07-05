import React, { createContext, useState, useEffect } from "react";
import {
  getTasks,
  createTask as apiCreateTask,
  updateTask as apiUpdateTask,
  deleteTask as apiDeleteTask,
  getCategories,
  createCategory as apiCreateCategory,
  updateCategory as apiUpdateCategory,
  deleteCategory as apiDeleteCategory,
} from "../api/apiService";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    fetchTasks();
    fetchCategories();
  }, []);

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();

      setCategories(response);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await apiCreateTask(task);
      setTasks([...tasks, response]);
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
      const response = await apiUpdateTask(id, updatedTask);
      setTasks(
        tasks.map((task) => (task.id === id ? { ...response, id } : task))
      );
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTask = async (id) => {
    try {
      await apiDeleteTask(id);
      setTasks(tasks.filter((task) => task.id !== id));
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const createCategory = async (category) => {
    try {
      const response = await apiCreateCategory(category);
      setCategories([...categories, response]);
    } catch (error) {
      console.error("Error creating category:", error);
    }
  };

  const editCategory = async (id, updatedCategory) => {
    try {
      const response = await apiUpdateCategory(id, updatedCategory);
      setCategories(
        categories.map((category) =>
          category.id === id ? { ...response, id } : category
        )
      );
    } catch (error) {
      console.error("Error updating category:", error);
    }
  };

  const removeCategory = async (id) => {
    try {
      await apiDeleteCategory(id);
      setCategories(categories.filter((category) => category.id !== id));
    } catch (error) {
      console.error("Error deleting category:", error);
    }
  };

  return (
    <DataContext.Provider
      value={{
        tasks,
        categories,
        fetchCategories,
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

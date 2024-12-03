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
  getUsers,
  deleteCategory,
} from "../api/apiService";

const DataContext = createContext();

const DataProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);
  const [users, setUsers] = useState([]);
  const [categories, setCategories] = useState([]);

  const fetchUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchTasks = async () => {
    try {
      const response = await getTasks();
      setTasks(response.data);
    } catch (error) {
      console.error("Error fetching tasks:", error);
    }
  };

  const fetchCategories = async () => {
    try {
      const response = await getCategories();
      setCategories(response.data);
    } catch (error) {
      console.error("Error fetching categories:", error);
    }
  };

  const createTask = async (task) => {
    try {
      const response = await apiCreateTask(task);
      if (response.success) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error creating task:", error);
    }
  };

  const editTask = async (id, updatedTask) => {
    try {
      const response = await apiUpdateTask(id, updatedTask);
      if (response.success) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error updating task:", error);
    }
  };

  const removeTask = async (id) => {
    try {
      const response = await apiDeleteTask(id);
      if (response.success) {
        fetchTasks();
      }
    } catch (error) {
      console.error("Error deleting task:", error);
    }
  };

  const createCategory = async (category) => {
    try {
      const response = await apiCreateCategory(category);

      if (response.success) {
        fetchCategories();
      }
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
      await deleteCategory(id);
      setCategories((prev) => prev.filter((category) => category.id !== id));
    } catch (error) {
      throw new Error("Erro ao remover a categoria.");
    }
  };

  useEffect(() => {
    fetchTasks();
    fetchCategories();
    fetchUsers();
  }, []);

  return (
    <DataContext.Provider
      value={{
        tasks,
        users,
        categories,
        fetchCategories,
        createTask,
        editTask,
        removeTask,
        createCategory,
        editCategory,
        removeCategory,
        getUsers,
      }}
    >
      {children}
    </DataContext.Provider>
  );
};

export { DataContext, DataProvider };

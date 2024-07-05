import axios from "axios";

const api = axios.create({
  baseURL: "http://localhost:5238",
});

export const getCategories = async () => {
  try {
    const response = await api.get("/Categories");
    console.log("Categories:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting categories:", error);
    throw error;
  }
};

export const getCategoryById = async (id) => {
  try {
    const response = await api.get(`/Categories/${id}`);
    console.log("Category:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting category:", error);
    throw error;
  }
};

export const createCategory = async (category) => {
  try {
    const response = await api.post("/Categories", category);
    console.log("Category created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating category:", error);
    throw error;
  }
};

export const updateCategory = async (id, category) => {
  try {
    const response = await api.put(`/Categories/${id}`, category);
    console.log("Category updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating category:", error);
    throw error;
  }
};

export const deleteCategory = async (id) => {
  try {
    const response = await api.delete(`/Categories/${id}`);
    console.log("Category deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting category:", error);
    throw error;
  }
};

export const getTasks = async () => {
  try {
    const response = await api.get("/Tasks");
    console.log("Tasks:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting tasks:", error);
    throw error;
  }
};

export const getTaskById = async (id) => {
  try {
    const response = await api.get(`/Tasks/${id}`);
    console.log("Task:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error getting task:", error);
    throw error;
  }
};

export const createTask = async (task) => {
  console.log(task);
  try {
    const response = await api.post("/Tasks", task);
    console.log("Task created:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error creating task:", error);
    throw error;
  }
};

export const updateTask = async (id, task) => {
  try {
    const response = await api.put(`/Tasks/${id}`, task);
    console.log("Task updated:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error updating task:", error);
    throw error;
  }
};

export const deleteTask = async (id) => {
  try {
    const response = await api.delete(`/Tasks/${id}`);
    console.log("Task deleted:", response.data);
    return response.data;
  } catch (error) {
    console.error("Error deleting task:", error);
    throw error;
  }
};

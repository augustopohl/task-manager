let users = [
  {
    id: 1,
    username: "user1",
    email: "user1@example.com",
    password: "password",
  },
];

let tasks = [
  {
    id: 1,
    title: "Médico",
    description: "Agendar consulta",
    status: "Pendente",
    userId: 1,
    createdAt: new Date(),
    completedAt: null,
    categoryId: 1,
  },
  {
    id: 2,
    title: "Revisão",
    description: "Revisar currículos",
    status: "Em progresso",
    userId: 1,
    createdAt: new Date(),
    completedAt: null,
    categoryId: 2,
  },
];

let categories = [
  { id: 1, name: "Trabalho", userId: 1 },
  { id: 2, name: "Pessoal", userId: 1 },
];

const addTask = (task) => {
  tasks.push({ id: tasks.length + 1, ...task });
};

const updateTask = (id, updatedTask) => {
  tasks = tasks.map((task) =>
    task.id === id ? { ...task, ...updatedTask } : task
  );
};

const deleteTask = (id) => {
  tasks = tasks.filter((task) => task.id !== id);
};

const addCategory = (category) => {
  categories.push({ id: categories.length + 1, ...category });
};

const updateCategory = (id, updatedCategory) => {
  categories = categories.map((category) =>
    category.id === id ? { ...category, ...updatedCategory } : category
  );
};

const deleteCategory = (id) => {
  categories = categories.filter((category) => category.id !== id);
};

export {
  users,
  tasks,
  categories,
  addTask,
  updateTask,
  deleteTask,
  addCategory,
  updateCategory,
  deleteCategory,
};

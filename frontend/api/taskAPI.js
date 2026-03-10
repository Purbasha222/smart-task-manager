import API from "./api";

// CREATE TASK
export const addTask = (data) => {
  if (data) console.log(data);
  return API.post("/tasks/add-task", data);
};

// GET ALL TASKS
export const getTasks = async () => {
  return API.get("/tasks");
};

// DELETE TASK

export const deleteTask = async (id) => {
  return API.delete(`/tasks/delete/${id}`);
};

// UPDATE TASK

export const updateTask = async (id, data) => {
  return API.put(`/tasks/update/${id}`, data);
};

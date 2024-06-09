// Import necessary modules and utilities
import axios from "axios";
import { LocalStorage } from "../util";

// Create an Axios instance for API requests
const apiClient = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URI,
  withCredentials: true,
  timeout: 120000,
});

// Add an interceptor to set authorization header with user token before requests
apiClient.interceptors.request.use(
  function (config) {
    // Retrieve user token from local storage
    const token = LocalStorage.get("token");
    // Set authorization header with bearer token
    config.headers.Authorization = `Bearer ${token}`;
    return config;
  },
  function (error) {
    return Promise.reject(error);
  }
);

// API functions for User actions
const loginUser = (data: { username: string; password: string }) => {
  return apiClient.post("/user/login", data);
};

const registerUser = (data: {
  email: string;
  password: string;
  username: string;
}) => {
  return apiClient.post("/user", data);
};

const logoutUser = () => {
  return apiClient.post("/user/logout");
};

// Todo's Api
const getAllTodos = () => {
  return apiClient.get("/todo");
};

const createTodo = (data: { title: string; description: string }) => {
  return apiClient.post("/todo", data);
};

const updateTodo = (
  data: { title: string; description: string },
  todoId: string
) => {
  return apiClient.patch(`/todo/${todoId}`, data);
};

const toggleIsCompleted = (todoId: string) => {
  return apiClient.patch(`/todo/toggle/${todoId}`);
};

const deleteTodo = (todoId: string) => {
  return apiClient.delete(`/todo/${todoId}`);
};

const clearTask = () => {
  return apiClient.delete("/todo");
};

const healthCheck = () => {
  return apiClient.get("/healthcheck");
};
// Export all the API functions
export {
  loginUser,
  logoutUser,
  registerUser,
  getAllTodos,
  createTodo,
  toggleIsCompleted,
  deleteTodo,
  clearTask,
  updateTodo,
  healthCheck,
};

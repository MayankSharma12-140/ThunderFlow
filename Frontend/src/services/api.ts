import axios from "axios";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "http://localhost:5000/api",
  headers: {
    "Content-Type": "application/json",
  },
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

export const updateProject = (id: string, data: {
  title: string;
  prompt: string;
framework: string;
}) => {
  return api.put(`/projects/${id}`, data);
};
export const regenerateAI = (id: string, instruction: string) => {
  return api.put(`/ai/regenerate/${id}`, {
    instruction
  });
};


export default api;
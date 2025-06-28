import axios from "axios";

const ApiFormData = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "multipart/form-data",
  },
});

const Api = axios.create({
  baseURL: "http://localhost:8000",
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export const createUserApi = (data) => ApiFormData.post("/api/create", data);
export const LoginUserApi = (data) => Api.post("/api/login", data);

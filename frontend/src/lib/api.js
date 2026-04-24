import axios from "axios";

const BACKEND_URL = process.env.REACT_APP_BACKEND_URL;
export const API = `${BACKEND_URL}/api`;

export const api = axios.create({ baseURL: API, timeout: 15000 });

export const fetchProjects = () => api.get("/projects").then((r) => r.data);
export const fetchPeople = () => api.get("/people").then((r) => r.data);
export const submitApplication = (payload) =>
  api.post("/careers/apply", payload).then((r) => r.data);

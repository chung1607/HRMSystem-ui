import axios from "axios";

const API_URL = "http://localhost:3000/admin";
const USER_API_URL = "http://localhost:3000/user";

axios.interceptors.request.use((config) => {
  const token = localStorage.getItem("access_token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export const getDashboardStats = () => {
  return axios.get(`${API_URL}/dashboard`);
};

export const getAllUsers = (query = {}) => {
  const params = new URLSearchParams();
  if (query.page) params.append("page", query.page);
  if (query.items_per_page)
    params.append("items_per_page", query.items_per_page);
  if (query.search) params.append("search", query.search);
  return axios.get(`${USER_API_URL}?${params.toString()}`);
};

export const disableUser = (id) => {
  return axios.patch(`${API_URL}/users/${id}/disable`);
};

export const enableUser = (id) => {
  return axios.patch(`${API_URL}/users/${id}/enable`);
};

export const changeUserRole = (id, role) => {
  return axios.patch(`${API_URL}/users/${id}/role`, { role });
};

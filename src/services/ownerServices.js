import axios from "axios";

const API_URL_OWNER = "http://localhost:3000/owner";

export const getOwnerDashboardStats = () => {
  return axios.get(`${API_URL_OWNER}/dashboard/stats`);
};

export const getOwnerCaneChart = (range = "week") => {
  return axios.get(`${API_URL_OWNER}/dashboard/cane-chart?range=${range}`);
};

export const getCaneTypeChart = () => {
  return axios.get(`${API_URL_OWNER}/dashboard/cane-type-chart`);
};

export const getTopWorkers = () => {
  return axios.get(`${API_URL_OWNER}/dashboard/top-workers`);
};

export const getRecentWorkLogs = () => {
  return axios.get(`${API_URL_OWNER}/dashboard/recent-work-logs`);
};

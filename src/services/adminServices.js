import axios from "axios";

const API_URL = "http://localhost:3000/admin";
const USER_API_URL = "http://localhost:3000/user";
const OWNER_API_URL = "http://localhost:3000/owner-requests";
const TEAM_API_URL = "http://localhost:3000/teams";
const SUBSCRIPTION_API_URL = "http://localhost:3000/owner-subscriptions";

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

export const getAllTeams = () => {
  return axios.get(`${TEAM_API_URL}`);
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

export const getOwnerRequests = () => {
  return axios.get(`${OWNER_API_URL}`);
};

export const approveOwnerRequest = (id) => {
  return axios.patch(`${OWNER_API_URL}/${id}/approve`);
};

export const rejectOwnerRequest = (id) => {
  return axios.patch(`${OWNER_API_URL}/${id}/reject`);
};

export const getPaymentChart = (range = "week") => {
  return axios.get(`${API_URL}/dashboard/payment-chart?range=${range}`);
};

export const getSubscriptionStatus = (status = "all") => {
  return axios.get(`${SUBSCRIPTION_API_URL}/status?status=${status}`);
};

export const approveSubscription = (id) => {
  return axios.patch(`${SUBSCRIPTION_API_URL}/${id}/approve`);
};

export const rejectSubscription = (id) => {
  return axios.patch(`${SUBSCRIPTION_API_URL}/${id}/reject`);
};

export const getUnpaidOwnersStats = () => {
  return axios.get(`${SUBSCRIPTION_API_URL}/dashboard-unpaid`);
};

export const getSugarcaneByTeam = () => {
  return axios.get(`${API_URL}/dashboard/sugarcane-team`);
};

export const getSubscriptionStatusStats = () => {
  return axios.get(`${API_URL}/dashboard/subscription-status`);
};

export const getTeamPerformance = () => {
  return axios.get(`${API_URL}/dashboard/team-performance`);
};

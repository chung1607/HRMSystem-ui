import axios from "axios";

const API_URL = "http://localhost:3000/auth";

export const register = (data) => {
  return axios.post(`${API_URL}/register`, data);
};

export const login = (data) => {
  return axios.post(`${API_URL}/login`, data);
};

export const sendOtp = (phone) => {
  return axios.post(`${API_URL}/send-otp`, { phone });
}

export const verifyOtp = (data) => {
  return axios.post(`${API_URL}/verify-otp`, data);
}
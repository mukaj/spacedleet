import axios from "axios";

const APIClient = axios.create({
  baseURL: "http://localhost:3333/",
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});

APIClient.interceptors.request.use(
  (config) => {
    const token =
      "oat_Mw.bmFuQ3pZWVotX0dBclJDVGMwWUFBYXc1QTZ4RWxCWi1CMGZNVXQzejM3MDc4MjkwNzA";
    console.log("Token from localStorage:", token);
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

export default APIClient;

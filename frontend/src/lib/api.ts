import axios from "axios";
import { getAccessToken } from "@/utils/token";

const api = axios.create({
  baseURL: import.meta.env.VITE_API_BASE_URL,
  timeout: 10000,
  headers: {
    "Content-Type": "application/json",
  },
});


// ============================================================
// JWT INTERCEPTOR
// ============================================================

api.interceptors.request.use(
  (config) => {

    const publicEndpoints = [
      "/auth/register",
      "/auth/login",
    ];

    const isPublicEndpoint =
      publicEndpoints.some((endpoint) =>
        config.url?.includes(endpoint)
      );


    // Add JWT to protected endpoints
    if (!isPublicEndpoint) {

      const token = getAccessToken();

      if (token) {

        config.headers.Authorization =
          `Bearer ${token}`;

      }
    }

    return config;
  },

  (error) => {
    return Promise.reject(error);
  }
);


export default api;
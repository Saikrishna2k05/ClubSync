import { getCookie } from "../utils/cookies.js";

// API Configuration
const API_BASE_URL = "http://localhost:3000";

// API Endpoints
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/user/login`,
  REGISTER: `${API_BASE_URL}/user/signup`,
  LOGOUT: `${API_BASE_URL}/user/logout`,

  // User endpoints
  GET_USER_PROFILE: `${API_BASE_URL}/api/users/me`,
  UPDATE_USER_PROFILE: `${API_BASE_URL}/api/users/me`,

  // Event endpoints
  GET_EVENTS: `${API_BASE_URL}/api/events`,
  CREATE_EVENT: `${API_BASE_URL}/api/events`,
  GET_EVENT: (id) => `${API_BASE_URL}/api/events/${id}`,
  UPDATE_EVENT: (id) => `${API_BASE_URL}/api/events/${id}`,
  DELETE_EVENT: (id) => `${API_BASE_URL}/api/events/${id}`,
  REGISTER_FOR_EVENT: (id) => `${API_BASE_URL}/api/events/${id}/register`,
  UNREGISTER_FROM_EVENT: (id) => `${API_BASE_URL}/api/events/${id}/unregister`,

  // Club endpoints
  GET_CLUBS: `${API_BASE_URL}/api/clubs`,
  CREATE_CLUB: `${API_BASE_URL}/api/clubs`,
  GET_CLUB: (id) => `${API_BASE_URL}/api/clubs/${id}`,
  UPDATE_CLUB: (id) => `${API_BASE_URL}/api/clubs/${id}`,
  DELETE_CLUB: (id) => `${API_BASE_URL}/api/clubs/${id}`,
  JOIN_CLUB: (id) => `${API_BASE_URL}/api/clubs/${id}/join`,
  LEAVE_CLUB: (id) => `${API_BASE_URL}/api/clubs/${id}/leave`,
};

// Generic API call function
export const apiCall = async (url, options = {}) => {
  const defaultOptions = {
    headers: {
      "Content-Type": "application/json",
    },
    credentials: "include", // Include cookies
  };

  const finalOptions = {
    ...defaultOptions,
    ...options,
    headers: {
      ...defaultOptions.headers,
      ...options.headers,
    },
  };

  try {
    const response = await fetch(url, finalOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    const data = await response.json();
    return data;
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

// API call with authentication
export const authenticatedApiCall = async (url, options = {}) => {
  return apiCall(url, options);
};

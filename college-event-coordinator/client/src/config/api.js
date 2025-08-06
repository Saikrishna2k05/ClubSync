import { getCookie } from "../utils/cookies.js";

// API Configuration
export const API_BASE_URL = "http://localhost:3000";

export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/user/login`,
  REGISTER: `${API_BASE_URL}/user/signup`,
  LOGOUT: `${API_BASE_URL}/user/logout`,

  // Event endpoints
  EVENTS: `${API_BASE_URL}/api/events`,
  CREATE_EVENT: `${API_BASE_URL}/api/events`,
  UPDATE_EVENT: (id) => `${API_BASE_URL}/api/events/${id}`,
  DELETE_EVENT: (id) => `${API_BASE_URL}/api/events/${id}`,
  REGISTER_FOR_EVENT: (id) => `${API_BASE_URL}/api/events/${id}/register`,

  // Club endpoints
  CLUBS: `${API_BASE_URL}/api/clubs`,
  CREATE_CLUB: `${API_BASE_URL}/api/clubs`,
  UPDATE_CLUB: (id) => `${API_BASE_URL}/api/clubs/${id}`,
  DELETE_CLUB: (id) => `${API_BASE_URL}/api/clubs/${id}`,
  JOIN_CLUB: (id) => `${API_BASE_URL}/api/clubs/${id}/join`,
  LEAVE_CLUB: (id) => `${API_BASE_URL}/api/clubs/${id}/leave`,

  // User endpoints
  PROFILE: `${API_BASE_URL}/api/users/profile`,
  UPDATE_PROFILE: `${API_BASE_URL}/api/users/profile`,
  USER_EVENTS: `${API_BASE_URL}/api/users/events`,
  USER_CLUBS: `${API_BASE_URL}/api/users/clubs`,
  USER_REGISTERED_EVENTS: `${API_BASE_URL}/api/users/registered-events`,
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = localStorage.getItem("token") || getCookie("token");
  return {
    "Content-Type": "application/json",
    ...(token && { Authorization: `Bearer ${token}` }),
  };
};

// Helper function for API calls
export const apiCall = async (endpoint, options = {}) => {
  const defaultOptions = {
    headers: getAuthHeaders(),
    ...options,
  };

  try {
    const response = await fetch(endpoint, defaultOptions);

    if (!response.ok) {
      const errorData = await response.json().catch(() => ({}));
      throw new Error(
        errorData.message || `HTTP error! status: ${response.status}`
      );
    }

    return await response.json();
  } catch (error) {
    console.error("API call error:", error);
    throw error;
  }
};

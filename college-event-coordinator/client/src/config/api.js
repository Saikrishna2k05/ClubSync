import { getCookie } from "../utils/cookies.js";

// API Configuration
// ===========================================
// BACKEND DEVELOPER: Replace YOUR_API_BASE_URL with your actual backend URL
// Examples:
// - Development: 'http://localhost:5000'
// - Production: 'https://your-backend-domain.com'
// ===========================================

export const API_BASE_URL = "YOUR_API_BASE_URL"; // REPLACE THIS WITH YOUR BACKEND URL

// API Endpoints aligned with backend specification
export const API_ENDPOINTS = {
  // Auth endpoints
  LOGIN: `${API_BASE_URL}/auth/login`,
  REGISTER: `${API_BASE_URL}/auth/register`,
  LOGOUT: `${API_BASE_URL}/auth/logout`,

  // User endpoints
  GET_USER: `${API_BASE_URL}/users/me`,
  UPDATE_USER: `${API_BASE_URL}/users/me`,

  // Event endpoints
  EVENTS: `${API_BASE_URL}/events`,
  CREATE_EVENT: `${API_BASE_URL}/events`,
  GET_EVENT: (id) => `${API_BASE_URL}/events/${id}`,
  UPDATE_EVENT: (id) => `${API_BASE_URL}/events/${id}`,
  DELETE_EVENT: (id) => `${API_BASE_URL}/events/${id}`,

  // Club endpoints
  CLUBS: `${API_BASE_URL}/clubs`,
  CREATE_CLUB: `${API_BASE_URL}/clubs`,
  GET_CLUB: (id) => `${API_BASE_URL}/clubs/${id}`,
  UPDATE_CLUB: (id) => `${API_BASE_URL}/clubs/${id}`,
  DELETE_CLUB: (id) => `${API_BASE_URL}/clubs/${id}`,

  // Club membership endpoints
  JOIN_CLUB: (clubId) => `${API_BASE_URL}/clubs/${clubId}/join`,
  LEAVE_CLUB: (clubId) => `${API_BASE_URL}/clubs/${clubId}/leave`,

  // Event registration endpoints
  REGISTER_EVENT: (eventId) => `${API_BASE_URL}/events/${eventId}/register`,
  UNREGISTER_EVENT: (eventId) => `${API_BASE_URL}/events/${eventId}/unregister`,
};

// Helper function to get auth headers
export const getAuthHeaders = () => {
  const token = getCookie("token");
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

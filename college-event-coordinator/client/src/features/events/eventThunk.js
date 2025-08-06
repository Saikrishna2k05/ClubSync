import { createAsyncThunk } from "@reduxjs/toolkit";
import axios from "axios";

const API_BASE = "http://localhost:5000/api";

export const createEvent = createAsyncThunk(
  "events/create",
  async (eventData, { getState, rejectWithValue }) => {
    try {
      const { auth } = getState();
      const response = await axios.post(`${API_BASE}/events`, eventData, {
        headers: { Authorization: `Bearer ${auth.token}` },
      });
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to create event"
      );
    }
  }
);

export const fetchEvents = createAsyncThunk(
  "events/fetchAll",
  async (_, { rejectWithValue }) => {
    try {
      const response = await axios.get(`${API_BASE}/events`);
      return response.data;
    } catch (error) {
      return rejectWithValue(
        error.response?.data?.message || "Failed to fetch events"
      );
    }
  }
);

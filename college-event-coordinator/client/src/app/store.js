import { configureStore } from "@reduxjs/toolkit";

// Create a simple test reducer
const testReducer = (state = { test: "working" }, action) => {
  return state;
};

const store = configureStore({
  reducer: {
    test: testReducer,
  },
});

export default store;

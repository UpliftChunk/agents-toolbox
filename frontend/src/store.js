import { configureStore } from '@reduxjs/toolkit';
import keywordReducer from './features/KeywordSlice';
import authReducer from "./features/AuthSlice"; 
import { loadState, saveState } from './util/LocalStorageUtils';

const preloadedState = loadState(); // Load saved state from localStorage

export const store = configureStore({
  reducer: {
    keyword: keywordReducer,
    auth: authReducer,
  },
  preloadedState, // Initialize the store with the loaded state
});

// Subscribe to the store and save state changes to localStorage
store.subscribe(() => {
  saveState({
    keyword: store.getState().keyword, // Save only the keyword slice
    auth: store.getState().auth, // Save the auth slice
  });
});

export default store;
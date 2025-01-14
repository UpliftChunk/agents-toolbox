import { createSlice } from '@reduxjs/toolkit';

const keywordSlice = createSlice({
  name: 'keyword',
  initialState: '',
  reducers: {
    setKeyword: (state, action) => {
      console.log("this is action:", action);
      return action.payload; // Updates the keyword state with the new value
    },
  },
});

export const { setKeyword } = keywordSlice.actions; // Export the action
export default keywordSlice.reducer; // Export the reducer

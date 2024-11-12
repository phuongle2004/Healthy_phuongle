// profileSlice.js
import { createSlice } from '@reduxjs/toolkit';

const profileSlice = createSlice({
  name: 'profile',
  initialState: {
    username: '',
  },
  reducers: {
    setUserName: (state, action) => {
      state.username = action.payload;
    },
  },
});

export const { setUserName } = profileSlice.actions;
export default profileSlice.reducer;

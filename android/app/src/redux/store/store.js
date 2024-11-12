import { configureStore } from '@reduxjs/toolkit';
import profileReducer from '../reducer/profileSlice'; // Đường dẫn đúng tới profileSlice

// Cấu hình store
const store = configureStore({
  reducer: {
    profile: profileReducer,
  },
});

export default store;

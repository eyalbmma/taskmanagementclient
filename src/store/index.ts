import { configureStore } from '@reduxjs/toolkit';
import tasksReducer from './tasksSlice';
import usersReducer from './usersSlice';

const store = configureStore({
  reducer: {
    tasks: tasksReducer,
    users: usersReducer,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
export default store;

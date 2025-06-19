import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { Task } from '../models/Task';
import { fetchTasksForUser } from '../api/tasksApi'; // ← שימוש בשירות

// פעולה אסינכרונית לשליפת משימות לפי מזהה משתמש
export const fetchTasks = createAsyncThunk(
  'tasks/fetchTasks',
  async (userId: number) => {
    return await fetchTasksForUser(userId); // ← שימוש בפונקציה מהשירות
  }
);

interface TasksState {
  tasks: Task[];
  loading: boolean;
  error: string | null;
}

const initialState: TasksState = {
  tasks: [],
  loading: false,
  error: null,
};

const tasksSlice = createSlice({
  name: 'tasks',
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTasks.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTasks.fulfilled, (state, action: PayloadAction<Task[]>) => {
        state.tasks = action.payload;
        state.loading = false;
      })
      .addCase(fetchTasks.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch tasks';
      });
  },
});

export default tasksSlice.reducer;

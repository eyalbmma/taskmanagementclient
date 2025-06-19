import { createSlice, createAsyncThunk, PayloadAction } from '@reduxjs/toolkit';
import { User } from '../models/User';
import { fetchAllUsers } from '../api/usersApi'; // ← שימוש בשירות

// פעולה אסינכרונית לשליפת משתמשים מהשרת
export const fetchUsers = createAsyncThunk('users/fetchUsers', async () => {
  return await fetchAllUsers(); // ← שימוש בפונקציה מהשירות
});

interface UsersState {
  users: User[];
  loading: boolean;
  error: string | null;
  selectedUserId: number | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
  selectedUserId: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setSelectedUserId: (state, action: PayloadAction<number>) => {
      state.selectedUserId = action.payload;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchUsers.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchUsers.fulfilled, (state, action: PayloadAction<User[]>) => {
        state.users = action.payload;
        state.loading = false;
      })
      .addCase(fetchUsers.rejected, (state, action) => {
        state.loading = false;
        state.error = action.error.message || 'Failed to fetch users';
      });
  },
});

export const { setSelectedUserId } = usersSlice.actions;
export default usersSlice.reducer;

import { createAsyncThunk, createSlice } from '@reduxjs/toolkit'
import type { PayloadAction } from '@reduxjs/toolkit'
import { ActionStatus, GameState, User } from '../../types'
import { getUsers } from '../../api'

const initialState: GameState = {
  user: null,
  users: [],
  getUsers: {
    status: ActionStatus.Idle,
    error: null,
  },
};

export const getUsersAction = createAsyncThunk(
  'getUsers',
  async (_arg: void, { rejectWithValue }) => {
    try {
      const users = await getUsers({ limit: 1000 });
      return users; 
    } catch (error) {
      rejectWithValue(error);
    }
  }
)

export const gameSlice = createSlice({
  name: 'game',
  initialState,
  reducers: {
    setUser: (state: GameState, action: PayloadAction<User>) => {
      state.user = action.payload;
    },
    setUsers: (state: GameState, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    }
  },
  extraReducers: builder => builder
    .addCase(getUsersAction.pending, 
      (state) => { state.getUsers = { status: ActionStatus.Pending, error: null }; })
    .addCase(getUsersAction.fulfilled, 
      (state) => { state.getUsers = { status: ActionStatus.Fulfilled, error: null }; })
    .addCase(getUsersAction.rejected, 
      (state, action) => { state.getUsers = { status: ActionStatus.Rejected, error: action.error }; })
      
});

export const { 
  setUser,
  setUsers,
} = gameSlice.actions

export default gameSlice.reducer
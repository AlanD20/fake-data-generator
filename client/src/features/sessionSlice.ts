import { info, User } from '@/common/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SesssionState = {
  users: User[];
  info: info | null;
};

const initialState: SesssionState = {
  users: [],
  info: null,
};

export const sessionSlice = createSlice({
  name: 'session',
  initialState,
  reducers: {
    setSession(state: SesssionState, action: PayloadAction<{ users: User[] }>) {
      state.users = action.payload.users;
    },
    setPage(
      state: SesssionState,
      action: PayloadAction<{ info: info | null }>
    ) {
      state.info = action.payload.info;
    },
    clearSession(state: SesssionState) {
      state.users = [];
      state.info = null;
    },
  },
});

export const { setSession, setPage, clearSession } = sessionSlice.actions;
export default sessionSlice.reducer;

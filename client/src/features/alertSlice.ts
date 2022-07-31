import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type AlertState = {
  error?: string | null;
  success?: string | null;
};

const initialState: AlertState = {
  error: null,
  success: null,
};

export const alertSlice = createSlice({
  name: 'alert',
  initialState,
  reducers: {
    setError(state: any, action: PayloadAction<AlertState>) {
      state.success = null;
      const message = action.payload.error ?? 'Something went Wrong';
      state.error = message;
    },
    setSuccess(state: any, action: PayloadAction<AlertState>) {
      state.error = null;
      state.success = action.payload.success;
    },
    clearAlert(state: any) {
      state.error = null;
      state.success = null;
    },
  },
});

export const { setError, setSuccess, clearAlert } = alertSlice.actions;
export default alertSlice.reducer;

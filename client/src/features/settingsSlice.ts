import { Locale } from '@/common/types';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type SettingsState = {
  error: number;
  seed: number | string;
  locale: Locale;
};

const initialState: SettingsState = {
  error: 0,
  seed: 0,
  locale: 'en',
};

export const settingsSlice = createSlice({
  name: 'settings',
  initialState,
  reducers: {
    setSettings(state: SettingsState, action: PayloadAction<SettingsState>) {
      state.error = action.payload.error;
      state.seed = action.payload.seed;
      state.locale = action.payload.locale;
    },
    clearSettings(state: SettingsState) {
      state.error = 0;
      state.seed = 0;
      state.locale = 'en';
    },
  },
});

export const { setSettings, clearSettings } = settingsSlice.actions;
export default settingsSlice.reducer;

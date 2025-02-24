import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState {
  token: string | null;
  preferences: string[];
  onboarded: boolean; // ✅ Add this property
}

const initialState: AuthState = {
  token: null,
  preferences: [],
  onboarded: false, // ✅ Initialize it
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; onboarded: boolean }>) => {
      state.token = action.payload.token;
      state.onboarded = action.payload.onboarded;  // Update onboarded
    },
    logout: (state) => {
      state.token = null;
      state.preferences = [];
      state.onboarded = false;  // Reset on logout
    },
    setOnboarded: (state, action: PayloadAction<boolean>) => {
      state.onboarded = action.payload;
    },
    setPreferences: (state, action: PayloadAction<string[]>) => {
      state.preferences = action.payload;
    },
    
  },
});

export const { login, logout, setPreferences, setOnboarded } = authSlice.actions;
export default authSlice.reducer;

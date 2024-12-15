import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface AuthState {
  token: string | null;
  displayName: string | null;
  isLoggedIn: boolean;
}

const initialState: AuthState = {
  token: null,
  displayName: null,
  isLoggedIn: false,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    login: (state, action: PayloadAction<{ token: string; displayName: string }>) => {
      state.token = action.payload.token;
      state.displayName = action.payload.displayName;
      state.isLoggedIn = true;
    },
    logout: (state) => {
      state.token = null;
      state.displayName = null;
      state.isLoggedIn = false;
    },
  },
});

export const { login, logout } = authSlice.actions;
export default authSlice.reducer;
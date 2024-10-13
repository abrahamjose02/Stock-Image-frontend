// src/store/userSlice.ts
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface UserState {
  fullname: string;
  email: string;
  phonenumber: string;
  token: string;
}

const initialState: UserState = {
  fullname: '',
  email: '',
  phonenumber: '',
  token: '',
};

const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    setUser: (state, action: PayloadAction<UserState>) => {
      state.fullname = action.payload.fullname;
      state.email = action.payload.email;
      state.phonenumber = action.payload.phonenumber;
      state.token = action.payload.token;
    },
    clearUser: (state) => {
      state.fullname = '';
      state.email = '';
      state.phonenumber = '';
      state.token = '';
    },
    setResetToken: (state, action) => {
      state.token = action.payload.token;
    },
  },
});

export const { setUser, clearUser, setResetToken } = userSlice.actions;

export default userSlice.reducer;

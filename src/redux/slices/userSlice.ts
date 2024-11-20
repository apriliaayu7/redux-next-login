import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface User {
  name: string;
  email: string;
  password: string;
}

interface UserState {
  users: User[];
  loggedInUser: User | null;
  status: string;
}

const initialState: UserState = {
  users: [
    { name: "John Doe", email: "john@example.com", password: "12345" }, // Contoh data pengguna
  ],
  loggedInUser: null,
  status: "loggedOut",
};

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {
    register: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload); // Menambahkan pengguna baru ke daftar pengguna
    },
    login: (state, action: PayloadAction<{ email: string; password: string }>) => {
      const user = state.users.find(
        (user) =>
          user.email === action.payload.email &&
          user.password === action.payload.password
      );
      if (user) {
        state.loggedInUser = user;
        state.status = "loggedIn";
      } else {
        state.loggedInUser = null;
        state.status = "loggedOut";
      }
    },
    logout: (state) => {
      state.loggedInUser = null;
      state.status = "loggedOut";
    },
  },
});

export const { login, logout, register } = userSlice.actions;

export const selectUser = (state: { user: UserState }) => state.user.loggedInUser;
export const selectUserStatus = (state: { user: UserState }) => state.user.status;

export default userSlice.reducer;

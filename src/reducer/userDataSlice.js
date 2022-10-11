import { createSlice } from "@reduxjs/toolkit";

export const userDataSlice = createSlice({
  name: "userData",
  initialState: {
    users: [],
  },
  reducers: {
    register: (state, action) => {
      state.users.push(action.payload);
    },
    // login: (state, action) => {
    //   state.user = action.payload;
    // },
    // logout: (state) => {
    //   state.user = null;
    // },
  },
});

export const { register, login, logout } = userDataSlice.actions;

// export const selectUser = (state) => state.user.user;

export default userDataSlice.reducer;

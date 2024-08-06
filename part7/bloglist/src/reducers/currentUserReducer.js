import { createSlice } from "@reduxjs/toolkit";

const currentUserSlice = createSlice({
  name: "user",
  initialState: "",
  reducers: {
    setUser(_, action) {
      return action.payload;
    },
    clearUser() {
      return "";
    },
  },
});

export const { setUser, clearUser } = currentUserSlice.actions;

export default currentUserSlice.reducer;

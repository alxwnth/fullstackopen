import { createSlice } from "@reduxjs/toolkit";

const notificationSlice = createSlice({
  name: "notification",
  initialState: "",
  reducers: {
    setNotificationText(_, action) {
      return action.payload;
    },
    clearNotificationText() {
      return "";
    },
  },
});

export const { setNotificationText, clearNotificationText } =
  notificationSlice.actions;

export default notificationSlice.reducer;

export const setNotification = (text, displayTime) => {
  return async (dispatch) => {
    dispatch(setNotificationText(text));
    setTimeout(() => {
      dispatch(clearNotificationText());
    }, displayTime);
  };
};

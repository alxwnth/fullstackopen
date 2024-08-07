import { configureStore } from "@reduxjs/toolkit";

import blogReducer from "./reducers/blogReducer";
import currentUserReducer from "./reducers/currentUserReducer";
import notificationReducer from "./reducers/notificationReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: currentUserReducer,
  },
});

export default store;

import { configureStore } from "@reduxjs/toolkit";

import notificationReducer from "./reducers/notificationReducer";
import blogReducer, { setBlogs } from "./reducers/blogReducer";
import currentUserReducer from "./reducers/currentUserReducer";

const store = configureStore({
  reducer: {
    notification: notificationReducer,
    blogs: blogReducer,
    user: currentUserReducer,
  },
});

export default store;

import { createSlice } from "@reduxjs/toolkit";

const blogSlice = createSlice({
  name: "blogs",
  initialState: [],
  reducers: {
    createBlog(state, action) {
      const content = action.payload;

      state.push({
        content,
        important: false,
        id: generateId(),
      });
    },

    appendBlog(state, action) {
      state.push(action.payload);
    },

    setBlogs(state, action) {
      return action.payload;
    },

    likeBlog(state, action) {
      const id = action.payload;

      const blogToChange = state.find((n) => n.id === id);

      const changedBlog = {
        ...blogToChange,
        likes: blogToChange.likes + 1,
      };

      return state.map((blog) => (blog.id !== id ? blog : changedBlog));
    },

    removeBlog(state, action) {
      const id = action.payload;

      return state.filter((blog) => blog.id !== id);
    },
  },
});

export const { createBlog, appendBlog, setBlogs, likeBlog, removeBlog } =
  blogSlice.actions;

export default blogSlice.reducer;

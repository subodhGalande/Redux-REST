import { configureStore } from "@reduxjs/toolkit";
import userReducer from "../components/users/userSlice";
import postReducer from "../components/posts/postSlice";
import sendPostReducer from "../components/posts/sendPostSlice";

const store = configureStore({
  reducer: {
    user: userReducer,
    post: postReducer,
    sendPosts: sendPostReducer,
  },
});

export default store;
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

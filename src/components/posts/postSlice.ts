import { createAsyncThunk, createSlice, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type Posts = {
  id: number;
  title: string;
  body: string;
};

type InitialState = {
  loading: boolean;
  posts: Posts[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  posts: [],
  error: "",
};

export const fetchPosts = createAsyncThunk("post/fetchPosts", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/posts")
    .then((response) => response.data);
});

const postSlice = createSlice({
  name: "post",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchPosts.fulfilled,
      (state, action: PayloadAction<Posts[]>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (state.loading = false),
          (state.posts = action.payload),
          (state.error = "");
      }
    );

    builder.addCase(fetchPosts.rejected, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.loading = false),
        (state.posts = []),
        (state.error = action.error.message || "something went wrong");
    });
  },
});

export default postSlice.reducer;

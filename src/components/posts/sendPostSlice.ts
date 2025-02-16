import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

interface Posts {
  userId: number;
  id?: number;
  body: string;
  title: string;
}

type InitialState = {
  loading: boolean;
  data: Posts[];
  error: string | null;
};

const initialState: InitialState = {
  loading: false,
  data: [],
  error: null,
};

export const sendPosts = createAsyncThunk(
  "sendPosts/fetchPosts",
  async (postData: { userId: number; title: string; body: string }) => {
    return axios
      .post<Posts>(
        "https://jsonplaceholder.typicode.com/posts",
        {
          title: "this is a new post",
          body: "by subodh",
          userId: 1,
        },
        {
          headers: {
            "Content-type": "application/json; charset=UTF-8",
          },
        }
      )
      .then((response) => response.data);
  }
);

const sendPostSlice = createSlice({
  name: "send",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(sendPosts.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(sendPosts.fulfilled, (state, action: PayloadAction<Posts>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions, no-sequences
        state.loading = false;
        state.data.push(action.payload);
        console.log("returnded data", action.payload);
        state.error = null;
      })
      .addCase(sendPosts.rejected, (state, action) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        state.loading = false;
        state.error = action.error.message || "something went wrong";
      });
  },
});

export default sendPostSlice.reducer;

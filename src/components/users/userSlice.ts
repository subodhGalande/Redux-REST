import { createSlice, createAsyncThunk, PayloadAction } from "@reduxjs/toolkit";
import axios from "axios";

type User = {
  id: number;
  name: string;
};

type InitialState = {
  loading: boolean;
  user: User[];
  error: string;
};

const initialState: InitialState = {
  loading: false,
  user: [],
  error: "",
};

export const fetchUsers = createAsyncThunk("user/fetchUsers", () => {
  return axios
    .get("https://jsonplaceholder.typicode.com/users")
    .then((response) => response.data);
});

const userSlice = createSlice({
  name: "user",
  initialState,
  reducers: {},
  extraReducers: (builder) => {
    builder.addCase(fetchUsers.pending, (state) => {
      state.loading = true;
    });
    builder.addCase(
      fetchUsers.fulfilled,
      (state, action: PayloadAction<User[]>) => {
        // eslint-disable-next-line @typescript-eslint/no-unused-expressions
        (state.loading = false),
          (state.user = action.payload),
          (state.error = "");
      }
    );
    builder.addCase(fetchUsers.rejected, (state, action) => {
      // eslint-disable-next-line @typescript-eslint/no-unused-expressions
      (state.loading = false),
        (state.user = []),
        (state.error = action.error.message || "Something went wrong");
    });
  },
});

export default userSlice.reducer;

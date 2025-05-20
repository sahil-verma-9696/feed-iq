import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getEvents = createAsyncThunk(
  "api/events",
  async (_, { rejectWithValue }) => {
    try {
      const responce = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/events`
      );
      const data = await responce.json();
      console.log(data);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetching events failed"
      );
    }
  }
);

const eventSlice = createSlice({
  name: "event",
  initialState: {
    events: [],
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEvents.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEvents.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getEvents.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {} = eventSlice.actions;
export default eventSlice.reducer;

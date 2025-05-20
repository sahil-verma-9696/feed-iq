import { createAsyncThunk, createSlice } from "@reduxjs/toolkit";

export const getEventAnalystics = createAsyncThunk(
  "analytics/event-summary",
  async (eventId, { rejectWithValue }) => {
    try {
      const responce = await fetch(
        `${
          import.meta.env.VITE_API_BASE_URL
        }/api/analytics/event-summary/${eventId}`
      );
      const data = await responce.json();
      console.log(data);

      return data;
    } catch (err) {
      return rejectWithValue(
        err.response?.data?.message || "Fetching event analytics failed"
      );
    }
  }
);

const eventAnalyticsSlice = createSlice({
  name: "eventAnalytic",
  initialState: {
    analytics: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(getEventAnalystics.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(getEventAnalystics.fulfilled, (state, action) => {
        state.events = action.payload;
        state.loading = false;
        state.error = null;
      })
      .addCase(getEventAnalystics.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const {} = eventAnalyticsSlice.actions;
export default eventAnalyticsSlice.reducer;

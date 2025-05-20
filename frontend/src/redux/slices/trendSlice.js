import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const fetchTrendData = createAsyncThunk(
  "trends/fetchTrendData",
  async (_, thunkAPI) => {
    try {
      const res = await fetch(
        `${import.meta.env.VITE_API_BASE_URL}/api/feedbacks/trends`
      );
      const data = await res.json();
      if (data.success) {
        // data.trends is an array of event trend objects
        const events = data.trends || [];

        // Prepare aspect data for each event (map eventId => aspectData)
        // Here for simplicity, just take the first event's aspect data
        const firstEvent = events[0] || null;

        const aspects = firstEvent?.aspectTrends
          ? Object.entries(firstEvent.aspectTrends).map(([aspect, stats]) => {
              const total = stats.positive + stats.neutral + stats.negative || 1;
              const score = (stats.positive - stats.negative) / total;
              return {
                aspect,
                averageSentiment: (score + 1) / 2,
              };
            })
          : [];

        return {
          events, // full list of events
          aspectData: aspects,
          trendingKeywords: firstEvent?.overallKeywords || [],
          dailyTrends: data.dailyTrends || [],
          pieSummary: data.pieSummary || {},
          trendData: data.dailyTrends || [],
          firstEventId: firstEvent?.eventId || null,
        };
      } else {
        return thunkAPI.rejectWithValue(data.message || "Fetch failed");
      }
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const trendSlice = createSlice({
  name: "trends",
  initialState: {
    events: [],
    trendData: [],
    aspectData: [],
    trendingKeywords: [],
    dailyTrends: [],
    pieSummary: {},
    firstEventId: null,
    loading: false,
    error: null,
  },
  reducers: {},
  extraReducers: (builder) => {
    builder
      .addCase(fetchTrendData.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(fetchTrendData.fulfilled, (state, action) => {
        state.loading = false;
        state.events = action.payload.events;
        state.trendData = action.payload.trendData;
        state.aspectData = action.payload.aspectData;
        state.trendingKeywords = action.payload.trendingKeywords;
        state.dailyTrends = action.payload.dailyTrends;
        state.pieSummary = action.payload.pieSummary;
        state.firstEventId = action.payload.firstEventId;
      })
      .addCase(fetchTrendData.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export default trendSlice.reducer;

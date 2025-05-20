import { createSlice, createAsyncThunk } from "@reduxjs/toolkit";

export const createEvent = createAsyncThunk(
  "events/createEvent",
  async (eventData, thunkAPI) => {
    try {
      const res = await fetch("http://localhost:5000/api/events", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify(eventData),
      });
      const data = await res.json();
      if (!res.ok) {
        return thunkAPI.rejectWithValue(
          data.message || "Failed to create event"
        );
      }
      return data;
    } catch (error) {
      return thunkAPI.rejectWithValue(error.message);
    }
  }
);

const createEventSlice = createSlice({
  name: "events",
  initialState: {
    loading: false,
    error: null,
    success: false,
    createdEvent: null,
  },
  reducers: {
    resetState: (state) => {
      state.loading = false;
      state.error = null;
      state.success = false;
      state.createdEvent = null;
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(createEvent.pending, (state) => {
        state.loading = true;
        state.error = null;
        state.success = false;
      })
      .addCase(createEvent.fulfilled, (state, action) => {
        state.loading = false;
        state.success = true;
        state.createdEvent = action.payload;
      })
      .addCase(createEvent.rejected, (state, action) => {
        state.loading = false;
        state.error = action.payload || "Something went wrong";
      });
  },
});

export const { resetState } = createEventSlice.actions;
export default createEventSlice.reducer;

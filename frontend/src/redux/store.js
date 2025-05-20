import { configureStore } from "@reduxjs/toolkit";
import appSlice from "./slices/appSlice";
import eventSlice from "./slices/eventSlice";
import eventAnalyticsSlice from "./slices/eventAnalyticsSlice";
import trendSlice from "./slices/trendSlice";
import createEventSlice from "./slices/createEventSlice";

export const store = configureStore({
  reducer: {
    app: appSlice,
    event: eventSlice,
    eventAnalytics: eventAnalyticsSlice,
    trends: trendSlice,
    events: createEventSlice,
  },
});

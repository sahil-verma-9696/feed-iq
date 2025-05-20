import { configureStore } from "@reduxjs/toolkit";
import appReduer from "./slices/appSlice";
import eventSlice from "./slices/eventSlice";

export const store = configureStore({
  reducer: {
    app: appReduer,
    event: eventSlice,
  },
});

import { configureStore } from "@reduxjs/toolkit";
import appReduer from "./slices/appSlice";

export const store = configureStore({
  reducer: {
    app: appReduer,
  },
});

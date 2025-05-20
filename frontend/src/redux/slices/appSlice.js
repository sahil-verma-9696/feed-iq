import { createSlice } from "@reduxjs/toolkit";
import Home from "../../pages/home/Index";
import Dashboard from "../../pages/dashboard/Index";
import Report from "../../pages/report/Index";
import Trend from "../../pages/trend-analysis/Index";
import Chatbot from "../../pages/chatbot/Index";

export const pages = {
  home: Home,
  dashboard: Dashboard,
  report: Report,
  trend: Trend,
  chat: Chatbot,
};

const initialState = {
  pageKey: "home", 
};

export const appSlice = createSlice({
  name: "app",
  initialState,
  reducers: {
    setPage: (state, action) => {
      state.pageKey = action.payload;
    },
  },
});

export const { setPage } = appSlice.actions;

export default appSlice.reducer;

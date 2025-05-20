import React from "react";
import { useSelector } from "react-redux";
import { Sidebar } from "./components/layout/Sidebar";
import { pages } from "./redux/slices/appSlice";
import { Routes, Route } from "react-router-dom"; // import Routes
import FeedbackPage from "./pages/feedback/FeedbackPage";

export default function App() {
  const page = useSelector((state) => state.app.pageKey);

  const Page =
    pages[page] ||
    function () {
      return <div>404</div>;
    };

  return (
    <div className="flex">
      <Sidebar />
      <div className="flex-1 h-screen overflow-y-auto">
        <Routes>
          {/* Your existing dynamic page route (optional) */}
          <Route path="*" element={<Page />} />

          {/* FeedbackPage route */}
          <Route path="/feedback/:eventId" element={<FeedbackPage />} />
        </Routes>
      </div>
    </div>
  );
}

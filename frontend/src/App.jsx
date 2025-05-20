import React from "react";
import { useSelector } from "react-redux";
import { Sidebar } from "./components/layout/Sidebar";
import { pages } from "./redux/slices/appSlice";

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
        <Page />
      </div>
    </div>
  );
}

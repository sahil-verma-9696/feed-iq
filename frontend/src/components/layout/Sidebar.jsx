import React, { useState } from "react";
import { useDispatch } from "react-redux";
import {
  AudioWaveform,
  BotMessageSquare,
  Command,
  FileText,
  GalleryVerticalEnd,
  Home as HomeIcon,
  TrendingUp,
  Menu,
} from "lucide-react";
import { setPage } from "../../redux/slices/appSlice";
import { useNavigate } from "react-router-dom";

export function Sidebar() {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [collapsed, setCollapsed] = useState(false);

  const handleNavClick = (pageKey) => {
    navigate("/");
    dispatch(setPage(pageKey));
  };

  const navItems = [
    { title: "Home", key: "home", icon: <HomeIcon size={20} /> },
    { title: "Dashboard", key: "dashboard", icon: <FileText size={20} /> },
    { title: "Report", key: "report", icon: <FileText size={20} /> },
    { title: "Trend Analysis", key: "trend", icon: <TrendingUp size={20} /> },
    {
      title: "Chat with your Data",
      key: "chat",
      icon: <BotMessageSquare size={20} />,
    },
  ];

  return (
    <div
      className={`h-screen bg-gray-100 dark:bg-gray-900 text-gray-800 dark:text-white transition-all duration-300 ${
        collapsed ? "w-20" : "w-64"
      } flex flex-col`}
    >
      {/* Header */}
      <div className="flex items-center justify-between px-4 py-3 border-b border-gray-300 dark:border-gray-700">
        <span
          className={`font-bold text-lg transition-all ${
            collapsed ? "hidden" : "block"
          }`}
        >
          SentimentIQ
        </span>
        <button onClick={() => setCollapsed(!collapsed)}>
          <Menu size={20} />
        </button>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-2 py-4 space-y-2">
        {navItems.map((item) => (
          <button
            key={item.key}
            onClick={() => handleNavClick(item.key)}
            className="w-full flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-800 transition"
          >
            {item.icon}
            {!collapsed && <span>{item.title}</span>}
          </button>
        ))}
      </nav>

      {/* Footer (Optional) */}
      <div className="px-4 py-3 border-t border-gray-300 dark:border-gray-700 text-sm">
        {!collapsed && (
          <div>
            <div className="font-semibold">User</div>
            <div className="text-gray-600 dark:text-gray-400">
              user@example.com
            </div>
          </div>
        )}
      </div>
    </div>
  );
}

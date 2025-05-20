import React from "react";
import {
  LineChart,
  Line,
  PieChart,
  Pie,
  Cell,
  XAxis,
  YAxis,
  Tooltip,
  ResponsiveContainer,
  Legend,
} from "recharts";
import { ThumbsUp, ThumbsDown, Meh } from "lucide-react";

// Dummy sentiment data
const trendData = [
  { date: "May 01", positive: 30, negative: 10, neutral: 15 },
  { date: "May 02", positive: 40, negative: 12, neutral: 18 },
  { date: "May 03", positive: 45, negative: 14, neutral: 20 },
  { date: "May 04", positive: 38, negative: 20, neutral: 22 },
  { date: "May 05", positive: 50, negative: 18, neutral: 25 },
];

const pieData = [
  { name: "Positive", value: 124 },
  { name: "Negative", value: 32 },
  { name: "Neutral", value: 44 },
];

const COLORS = ["#4ade80", "#f87171", "#facc15"]; // green, red, yellow

export default function Index() {
  const stats = [
    {
      title: "Positive",
      count: 124,
      icon: <ThumbsUp className="text-green-500" />,
    },
    {
      title: "Negative",
      count: 32,
      icon: <ThumbsDown className="text-red-500" />,
    },
    { title: "Neutral", count: 44, icon: <Meh className="text-yellow-500" /> },
  ];

  return (
    <div className="p-6 bg-white dark:bg-gray-900 min-h-screen text-gray-800 dark:text-white">
      <h1 className="text-2xl font-bold mb-6">
        Dashboard - Sentiment Analysis
      </h1>

      {/* Stats */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        {stats.map((stat, i) => (
          <div
            key={i}
            className="bg-gray-100 dark:bg-gray-800 rounded-xl p-5 flex items-center justify-between shadow"
          >
            <div>
              <h2 className="text-lg font-semibold">{stat.title}</h2>
              <p className="text-2xl font-bold">{stat.count}</p>
            </div>
            {stat.icon}
          </div>
        ))}
      </div>

      {/* Charts Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8">
        {/* Line Chart */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Sentiment Trend</h2>
          <ResponsiveContainer width="100%" height={250}>
            <LineChart data={trendData}>
              <XAxis dataKey="date" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Line type="monotone" dataKey="positive" stroke="#4ade80" />
              <Line type="monotone" dataKey="negative" stroke="#f87171" />
              <Line type="monotone" dataKey="neutral" stroke="#facc15" />
            </LineChart>
          </ResponsiveContainer>
        </div>

        {/* Pie Chart */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">
            Overall Sentiment Distribution
          </h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={pieData}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                label
              >
                {pieData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

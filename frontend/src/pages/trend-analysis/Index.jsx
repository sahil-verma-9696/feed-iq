import React from "react";
import {
  LineChart,
  Line,
  CartesianGrid,
  XAxis,
  YAxis,
  Tooltip,
  Legend,
  ResponsiveContainer,
  BarChart,
  Bar,
} from "recharts";

const trendData = [
  { date: "2025-05-01", positive: 40, neutral: 30, negative: 20 },
  { date: "2025-05-02", positive: 45, neutral: 25, negative: 15 },
  { date: "2025-05-03", positive: 50, neutral: 20, negative: 10 },
  { date: "2025-05-04", positive: 55, neutral: 15, negative: 15 },
  { date: "2025-05-05", positive: 60, neutral: 10, negative: 10 },
];

const aspectData = [
  { aspect: "UI", averageSentiment: 0.75 },
  { aspect: "Performance", averageSentiment: 0.65 },
  { aspect: "Features", averageSentiment: 0.85 },
  { aspect: "Support", averageSentiment: 0.60 },
  { aspect: "Pricing", averageSentiment: 0.55 },
];

const trendingKeywords = [
  "User-friendly",
  "Laggy",
  "New Features",
  "Customer Support",
  "Pricing Complaints",
];

export default function Index() {
  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6">Trend Analysis</h1>

      {/* Line Chart: Sentiment Trend Over Time */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Sentiment Trend Over Time</h2>
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={trendData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="date" />
            <YAxis />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="positive" stroke="#22c55e" />
            <Line type="monotone" dataKey="neutral" stroke="#facc15" />
            <Line type="monotone" dataKey="negative" stroke="#ef4444" />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Bar Chart: Aspect-wise Average Sentiment */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
        <h2 className="text-xl font-semibold mb-4">Aspect-wise Average Sentiment</h2>
        <ResponsiveContainer width="100%" height={250}>
          <BarChart data={aspectData} margin={{ top: 5, right: 20, left: 0, bottom: 5 }}>
            <XAxis dataKey="aspect" />
            <YAxis domain={[0, 1]} />
            <CartesianGrid strokeDasharray="3 3" />
            <Tooltip />
            <Bar dataKey="averageSentiment" fill="#6366f1" />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Trending Keywords */}
      <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow max-w-md">
        <h2 className="text-xl font-semibold mb-4">Trending Keywords</h2>
        <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
          {trendingKeywords.map((keyword, i) => (
            <li key={i} className="hover:text-indigo-500 cursor-pointer">
              {keyword}
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
}

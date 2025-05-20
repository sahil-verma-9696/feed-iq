import React from "react";
import { Download } from "lucide-react";
import jsPDF from "jspdf";
import Papa from "papaparse";
import { saveAs } from "file-saver";
import {
  PieChart,
  Pie,
  Cell,
  Tooltip,
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  ResponsiveContainer,
  Legend,
} from "recharts";

const COLORS = ["#22c55e", "#facc15", "#ef4444"]; // green, yellow, red

export default function Index() {
  // Dummy data
  const feedbackData = [
    { name: "Alice", sentiment: "Positive", score: 0.9 },
    { name: "Bob", sentiment: "Neutral", score: 0.6 },
    { name: "Charlie", sentiment: "Negative", score: 0.3 },
  ];

  const sentimentCounts = [
    { name: "Positive", value: 1 },
    { name: "Neutral", value: 1 },
    { name: "Negative", value: 1 },
  ];

  const downloadCSV = () => {
    const csv = Papa.unparse(feedbackData);
    const blob = new Blob([csv], { type: "text/csv;charset=utf-8;" });
    saveAs(blob, "feedback_report.csv");
  };

  const downloadPDF = () => {
    const doc = new jsPDF();
    doc.setFontSize(16);
    doc.text("Feedback Sentiment Report", 20, 20);

    let y = 40;
    feedbackData.forEach((row, index) => {
      doc.text(
        `${index + 1}. ${row.name} - ${row.sentiment} (${row.score})`,
        20,
        y
      );
      y += 10;
    });

    doc.save("feedback_report.pdf");
  };

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 text-gray-800 dark:text-white">
      <div className="flex justify-between items-center mb-6">
        <h1 className="text-3xl font-bold">Feedback Report</h1>
        <div className="flex gap-4">
          <button
            onClick={downloadCSV}
            className="flex items-center gap-2 px-4 py-2 bg-blue-600 text-white rounded hover:bg-blue-700"
          >
            <Download size={18} />
            CSV
          </button>
          <button
            onClick={downloadPDF}
            className="flex items-center gap-2 px-4 py-2 bg-red-600 text-white rounded hover:bg-red-700"
          >
            <Download size={18} />
            PDF
          </button>
        </div>
      </div>

      <div className="grid gap-6 md:grid-cols-2">
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">Sentiment Distribution</h2>
          <ResponsiveContainer width="100%" height={250}>
            <PieChart>
              <Pie
                data={sentimentCounts}
                dataKey="value"
                nameKey="name"
                cx="50%"
                cy="50%"
                outerRadius={80}
                fill="#8884d8"
                label
              >
                {sentimentCounts.map((_, index) => (
                  <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                ))}
              </Pie>
              <Tooltip />
              <Legend />
            </PieChart>
          </ResponsiveContainer>
        </div>

        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow">
          <h2 className="text-xl font-semibold mb-4">User Sentiment Scores</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={feedbackData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis domain={[0, 1]} />
              <Tooltip />
              <Legend />
              <Bar dataKey="score" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
}

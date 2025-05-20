import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
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
import { fetchTrendData } from "../../redux/slices/trendSlice";

export default function Index() {
  const dispatch = useDispatch();

  const {
    events,
    trendData,
    aspectData,
    trendingKeywords,
    dailyTrends,
    pieSummary,
    firstEventId,
    loading,
    error,
  } = useSelector((state) => state.trends);

  // Keep selected event (default to first event)
  const [selectedEventId, setSelectedEventId] = useState(firstEventId);

  // Update selectedEventId when events load or firstEventId changes
  useEffect(() => {
    if (firstEventId) {
      setSelectedEventId(firstEventId);
    }
  }, [firstEventId]);

  // Find selected event object
  const selectedEvent = events.find((e) => e.eventId === selectedEventId);

  // Prepare aspectData for selectedEvent
  const currentAspectData = selectedEvent?.aspectTrends
    ? Object.entries(selectedEvent.aspectTrends).map(([aspect, stats]) => {
        const total = stats.positive + stats.neutral + stats.negative || 1;
        const score = (stats.positive - stats.negative) / total;
        return {
          aspect,
          averageSentiment: (score + 1) / 2,
        };
      })
    : [];

  // Keywords and suggestions for selected event
  const currentKeywords = selectedEvent?.overallKeywords || [];
  const overallSuggestions = selectedEvent?.overallSuggestions || [];
  const aspectSuggestions = selectedEvent?.aspectTrends || {};

  useEffect(() => {
    dispatch(fetchTrendData());
  }, [dispatch]);

  if (loading)
    return (
      <div className="min-h-screen flex justify-center items-center">
        <p>Loading...</p>
      </div>
    );

  if (error)
    return (
      <div className="min-h-screen flex justify-center items-center text-red-500">
        <p>{error}</p>
      </div>
    );

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 text-gray-900 dark:text-white">
      <h1 className="text-3xl font-bold mb-6 text-center">📊 Trend Analysis Dashboard</h1>

      {/* Event Selector if multiple events */}
      {events.length > 1 && (
        <div className="mb-6 flex justify-center space-x-4">
          {events.map((event) => (
            <button
              key={event.eventId}
              onClick={() => setSelectedEventId(event.eventId)}
              className={`px-4 py-2 rounded ${
                selectedEventId === event.eventId
                  ? "bg-indigo-600 text-white"
                  : "bg-gray-300 dark:bg-gray-700 text-gray-900 dark:text-white"
              }`}
            >
              Event {event.eventId.slice(0, 6)}
            </button>
          ))}
        </div>
      )}

      {/* Line Chart: Sentiment Trend Over Time (from dailyTrends) */}
      {trendData.length > 0 && (
        <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">📈 Sentiment Trend Over Time</h2>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={trendData}>
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
        </section>
      )}

      {/* Bar Chart: Aspect-wise Sentiment */}
      {currentAspectData.length > 0 && (
        <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow mb-8">
          <h2 className="text-xl font-semibold mb-4">📊 Aspect-wise Average Sentiment</h2>
          <ResponsiveContainer width="100%" height={250}>
            <BarChart data={currentAspectData}>
              <XAxis dataKey="aspect" />
              <YAxis domain={[0, 1]} />
              <CartesianGrid strokeDasharray="3 3" />
              <Tooltip />
              <Bar dataKey="averageSentiment" fill="#6366f1" />
            </BarChart>
          </ResponsiveContainer>
        </section>
      )}

      {/* Pie Summary Table (overall, aggregated across events) */}
      {pieSummary && (
        <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow mb-8 max-w-md">
          <h2 className="text-xl font-semibold mb-4">🥧 Overall Sentiment Summary</h2>
          <table className="w-full text-left">
            <thead>
              <tr className="text-indigo-500">
                <th className="p-2">Sentiment</th>
                <th className="p-2">Count</th>
              </tr>
            </thead>
            <tbody>
              {["positive", "neutral", "negative"].map((key) => (
                <tr key={key}>
                  <td className="capitalize p-2">{key}</td>
                  <td className="p-2">{pieSummary[key]}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </section>
      )}

      {/* Trending Keywords */}
      {currentKeywords.length > 0 && (
        <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow mb-8 max-w-md">
          <h2 className="text-xl font-semibold mb-4">🔥 Trending Keywords</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            {currentKeywords.map((keyword, i) => (
              <li key={i} className="hover:text-indigo-500 cursor-pointer">
                {keyword}
              </li>
            ))}
          </ul>
        </section>
      )}

      {/* Overall Suggestions */}
      {overallSuggestions.length > 0 && (
        <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow mb-8 max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">💡 Overall Suggestions</h2>
          <ul className="list-disc pl-6 space-y-2 text-gray-700 dark:text-gray-300">
            {overallSuggestions.map((suggestion, index) => (
              <li key={index}>{suggestion}</li>
            ))}
          </ul>
        </section>
      )}

      {/* Aspect-wise Suggestions */}
      {aspectSuggestions && (
        <section className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow max-w-2xl">
          <h2 className="text-xl font-semibold mb-4">📝 Aspect-wise Suggestions</h2>
          {Object.entries(aspectSuggestions).map(([aspect, values]) => {
            if (!values.suggestions?.length) return null;
            return (
              <div key={aspect} className="mb-4">
                <h3 className="font-semibold capitalize mb-2">{aspect}</h3>
                <ul className="list-disc pl-6 space-y-1 text-gray-700 dark:text-gray-300">
                  {values.suggestions.map((suggestion, idx) => (
                    <li key={idx}>{suggestion}</li>
                  ))}
                </ul>
              </div>
            );
          })}
        </section>
      )}
    </div>
  );
}

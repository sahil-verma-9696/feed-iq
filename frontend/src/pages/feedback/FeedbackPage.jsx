import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";

export default function FeedbackPage() {
  const { eventId } = useParams();

  // Dark mode state, default follows system preference
  const [darkMode, setDarkMode] = useState(
    () =>
      window.matchMedia &&
      window.matchMedia("(prefers-color-scheme: dark)").matches
  );

  // Update body class on darkMode change
  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
  }, [darkMode]);

  const [eventData, setEventData] = useState(null);
  const [loadingEvent, setLoadingEvent] = useState(true);
  const [fetchError, setFetchError] = useState("");

  const [userName, setUserName] = useState("");
  const [overallFeedback, setOverallFeedback] = useState("");
  const [aspectFeedback, setAspectFeedback] = useState({});

  const [loadingSubmit, setLoadingSubmit] = useState(false);
  const [submitError, setSubmitError] = useState("");
  const [submitSuccess, setSubmitSuccess] = useState("");

  useEffect(() => {
    async function fetchEvent() {
      try {
        setLoadingEvent(true);
        setFetchError("");
        const res = await fetch(`http://localhost:5000/api/events/${eventId}`);
        if (!res.ok) {
          const data = await res.json();
          throw new Error(data.message || "Failed to fetch event data");
        }
        const data = await res.json();
        setEventData(data);

        const aspects = data.aspects || [];
        const initialAspectFeedback = {};
        aspects.forEach((aspect) => {
          initialAspectFeedback[aspect] = "";
        });
        setAspectFeedback(initialAspectFeedback);
      } catch (err) {
        setFetchError(err.message);
      } finally {
        setLoadingEvent(false);
      }
    }
    fetchEvent();
  }, [eventId]);

  const handleAspectChange = (aspect, value) => {
    setAspectFeedback((prev) => ({ ...prev, [aspect]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitError("");
    setSubmitSuccess("");
    setLoadingSubmit(true);

    try {
      const res = await fetch(
        `http://localhost:5000/api/feedbacks/${eventId}`,
        {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            userName,
            aspectFeedback,
            overallFeedback,
          }),
        }
      );

      if (!res.ok) {
        const data = await res.json();
        throw new Error(data.message || "Failed to submit feedback");
      }

      setSubmitSuccess("Feedback submitted successfully!");
      setUserName("");
      setOverallFeedback("");
      const resetAspectFeedback = {};
      (eventData?.aspects || []).forEach((aspect) => {
        resetAspectFeedback[aspect] = "";
      });
      setAspectFeedback(resetAspectFeedback);
    } catch (err) {
      setSubmitError(err.message);
    } finally {
      setLoadingSubmit(false);
    }
  };

  if (loadingEvent)
    return (
      <p className="text-gray-700 dark:text-gray-300 text-center mt-10">
        Loading event details...
      </p>
    );
  if (fetchError)
    return (
      <p className="text-red-600 dark:text-red-400 text-center mt-10">
        Error: {fetchError}
      </p>
    );

  if (!eventData)
    return (
      <p className="text-gray-700 dark:text-gray-300 text-center mt-10">
        No event data found.
      </p>
    );

  return (
    <div className="max-w-xl mx-auto p-6 mt-12 rounded-lg shadow-lg bg-white dark:bg-gray-900 text-gray-900 dark:text-gray-200">
      {/* Dark mode toggle button */}
      <div className="flex justify-end mb-6">
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="px-3 py-1 rounded-md border border-gray-400 dark:border-gray-600 text-sm font-medium
            hover:bg-gray-200 dark:hover:bg-gray-700 transition"
          aria-label="Toggle dark mode"
        >
          {darkMode ? "Light Mode" : "Dark Mode"}
        </button>
      </div>

      <h2 className="text-3xl font-extrabold mb-6 border-b border-gray-300 dark:border-gray-700 pb-2">
        Feedback for:{" "}
        <span className="text-indigo-600 dark:text-indigo-400">
          {eventData.eventName || "Event"}
        </span>
      </h2>

      <form onSubmit={handleSubmit} className="space-y-6">
        <div>
          <label
            htmlFor="userName"
            className="block text-sm font-semibold mb-2"
          >
            Your Name
          </label>
          <input
            type="text"
            id="userName"
            value={userName}
            onChange={(e) => setUserName(e.target.value)}
            required
            placeholder="Enter your name"
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700
            bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {(eventData.aspects || []).map((aspect) => (
          <div key={aspect}>
            <label
              htmlFor={`aspect-${aspect}`}
              className="block text-sm font-semibold mb-2 capitalize"
            >
              {aspect}
            </label>
            <input
              type="text"
              id={`aspect-${aspect}`}
              value={aspectFeedback[aspect] || ""}
              onChange={(e) => handleAspectChange(aspect, e.target.value)}
              placeholder={`Your feedback on ${aspect}`}
              required
              className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700
              bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200
              placeholder-gray-500 dark:placeholder-gray-400
              focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
            />
          </div>
        ))}

        <div>
          <label
            htmlFor="overallFeedback"
            className="block text-sm font-semibold mb-2"
          >
            Overall Feedback
          </label>
          <textarea
            id="overallFeedback"
            value={overallFeedback}
            onChange={(e) => setOverallFeedback(e.target.value)}
            placeholder="Your overall experience"
            rows={4}
            required
            className="w-full px-4 py-3 rounded-md border border-gray-300 dark:border-gray-700
            bg-gray-100 dark:bg-gray-800 text-gray-900 dark:text-gray-200
            placeholder-gray-500 dark:placeholder-gray-400
            focus:outline-none focus:ring-2 focus:ring-indigo-500 transition"
          />
        </div>

        {submitError && (
          <p className="text-red-600 dark:text-red-400 font-semibold">
            {submitError}
          </p>
        )}
        {submitSuccess && (
          <p className="text-green-600 dark:text-green-400 font-semibold">
            {submitSuccess}
          </p>
        )}

        <button
          type="submit"
          disabled={loadingSubmit}
          className="w-full py-3 bg-indigo-600 rounded-md text-white font-semibold
            hover:bg-indigo-700 transition disabled:opacity-50 disabled:cursor-not-allowed"
        >
          {loadingSubmit ? "Submitting..." : "Submit Feedback"}
        </button>
      </form>
    </div>
  );
}

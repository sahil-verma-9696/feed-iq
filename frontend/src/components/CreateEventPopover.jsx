import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { createEvent, resetState } from "../redux/slices/createEventSlice";
import { QRCodeSVG } from "qrcode.react";

export default function CreateEventPopover({ open, setOpen }) {
  const dispatch = useDispatch();
  const { loading, error, success, createdEvent } = useSelector(
    (state) => state.events
  );

  // Form fields state
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    clubName: "",
    eventDate: "",
    aspectsText: "",
  });

  const togglePopover = () => {
    setOpen((prev) => !prev);
    if (success) {
      dispatch(resetState());
      setFormData({
        eventName: "",
        eventType: "",
        clubName: "",
        eventDate: "",
        aspectsText: "",
      });
    }
  };

  const handleChange = (e) => {
    setFormData((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const aspects = formData.aspectsText
      .split(",")
      .map((a) => a.trim())
      .filter((a) => a.length > 0);

    const payload = {
      eventName: formData.eventName,
      eventType: formData.eventType,
      clubName: formData.clubName,
      eventDate: formData.eventDate,
      aspects,
    };

    dispatch(createEvent(payload));
  };

  // Close modal if clicked outside form content
  const handleOverlayClick = (e) => {
    if (e.target.id === "modal-overlay") {
      togglePopover();
    }
  };

  return (
    <>
      {open && (
        <div
          id="modal-overlay"
          onClick={handleOverlayClick}
          className="fixed inset-0 bg-black bg-opacity-50 dark:bg-opacity-80 flex items-center justify-center z-50"
          role="dialog"
          aria-modal="true"
        >
          <div className="bg-white dark:bg-gray-900 rounded-md shadow-lg p-6 w-full max-w-md mx-4">
            <form onSubmit={handleSubmit} className="space-y-5">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-gray-100">
                Create Event
              </h3>

              <div>
                <label
                  htmlFor="eventName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Event Name
                </label>
                <input
                  type="text"
                  name="eventName"
                  id="eventName"
                  value={formData.eventName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                />
              </div>

              <div>
                <label
                  htmlFor="eventType"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Event Type
                </label>
                <input
                  type="text"
                  name="eventType"
                  id="eventType"
                  value={formData.eventType}
                  onChange={handleChange}
                  required
                  placeholder="e.g., Workshop"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                />
              </div>

              <div>
                <label
                  htmlFor="clubName"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Club Name
                </label>
                <input
                  type="text"
                  name="clubName"
                  id="clubName"
                  value={formData.clubName}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                />
              </div>

              <div>
                <label
                  htmlFor="eventDate"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Event Date
                </label>
                <input
                  type="date"
                  name="eventDate"
                  id="eventDate"
                  value={formData.eventDate}
                  onChange={handleChange}
                  required
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                />
              </div>

              <div>
                <label
                  htmlFor="aspectsText"
                  className="block text-sm font-medium text-gray-700 dark:text-gray-300"
                >
                  Aspects (comma separated)
                </label>
                <input
                  type="text"
                  name="aspectsText"
                  id="aspectsText"
                  value={formData.aspectsText}
                  onChange={handleChange}
                  placeholder="projector, networking, refreshments"
                  className="mt-1 block w-full rounded-md border border-gray-300 px-3 py-2
                    focus:outline-none focus:ring-2 focus:ring-indigo-500
                    dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                />
              </div>

              {error && (
                <p className="text-red-600 dark:text-red-400">{error}</p>
              )}

              {success && (
                <>
                  <p className="text-green-600 dark:text-green-400 mb-2">
                    Event created successfully! Event ID:{" "}
                    {createdEvent?._id || "N/A"}
                  </p>

                  <div className="flex flex-col items-center space-y-2 mt-4">
                    <QRCodeSVG
                      value={`${import.meta.env.VITE_FRONTEND_BASE_URL}/api/feedbacks/${
                        createdEvent?._id
                      }`}
                      size={128}
                    />

                    <div className="flex items-center space-x-2 mt-2">
                      <input
                        type="text"
                        readOnly
                        value={`${import.meta.env.VITE_FRONTEND_BASE_URL}/feedbacks/${
                          createdEvent?._id
                        }`}
                        className="w-64 px-2 py-1 border border-gray-300 rounded-md text-sm dark:bg-gray-800 dark:border-gray-700 dark:text-gray-200"
                      />
                      <button
                        onClick={() => {
                          navigator.clipboard.writeText(
                            `${import.meta.env.VITE_FRONTEND_BASE_URL}/feedback/${
                              createdEvent?._id
                            }`
                          );
                          alert("Copied to clipboard!");
                        }}
                        className="px-3 py-1 bg-indigo-600 text-white rounded hover:bg-indigo-700 focus:outline-none"
                        type="button"
                      >
                        Copy URL
                      </button>
                    </div>
                  </div>
                </>
              )}

              <div className="flex justify-end space-x-3">
                <button
                  type="button"
                  onClick={togglePopover}
                  className="px-4 py-2 rounded bg-gray-300 hover:bg-gray-400 dark:bg-gray-700 dark:hover:bg-gray-600"
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  disabled={loading}
                  className="px-4 py-2 rounded bg-indigo-600 text-white hover:bg-indigo-700 disabled:opacity-50"
                >
                  {loading ? "Creating..." : "Create"}
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </>
  );
}

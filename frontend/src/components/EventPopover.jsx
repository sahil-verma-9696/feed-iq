import React, { useState } from "react";

const EventPopover = () => {
  const [open, setOpen] = useState(false);
  const [formData, setFormData] = useState({
    eventName: "",
    eventType: "",
    clubName: "",
    eventDate: "",
    aspects: [],
    aspectInput: "",
  });

  const handleChange = (e) =>
    setFormData({ ...formData, [e.target.name]: e.target.value });

  const handleAspectAdd = () => {
    if (formData.aspectInput.trim()) {
      setFormData((prev) => ({
        ...prev,
        aspects: [...prev.aspects, prev.aspectInput.trim()],
        aspectInput: "",
      }));
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log("Form submitted:", formData);
    setOpen(false);
  };

  const closeModal = () => setOpen(false);

  return (
    <>
      <button
        onClick={() => setOpen(true)}
        className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700"
      >
        Create Event
      </button>

      {open && (
        <>
          {/* Backdrop */}
          <div
            className="fixed inset-0 bg-black bg-opacity-50 z-40"
            onClick={closeModal}
          />

          {/* Modal */}
          <div className="fixed inset-0 z-50 flex items-center justify-center px-4">
            <div className="w-full max-w-xl bg-white dark:bg-gray-800 p-6 rounded-2xl shadow-lg relative">
              <h2 className="text-2xl font-bold text-gray-900 dark:text-white mb-4">
                Create Event
              </h2>

              <form onSubmit={handleSubmit}>
                <div className="mb-3">
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Event Name
                  </label>
                  <input
                    type="text"
                    name="eventName"
                    value={formData.eventName}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Event Type
                  </label>
                  <input
                    type="text"
                    name="eventType"
                    value={formData.eventType}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Club Name
                  </label>
                  <input
                    type="text"
                    name="clubName"
                    value={formData.clubName}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Event Date
                  </label>
                  <input
                    type="date"
                    name="eventDate"
                    value={formData.eventDate}
                    onChange={handleChange}
                    className="w-full p-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    required
                  />
                </div>

                <div className="mb-3">
                  <label className="block text-gray-700 dark:text-gray-300 mb-1">
                    Aspects
                  </label>
                  <div className="flex gap-2">
                    <input
                      type="text"
                      name="aspectInput"
                      value={formData.aspectInput}
                      onChange={handleChange}
                      className="flex-1 p-2 rounded-md border dark:border-gray-600 bg-gray-100 dark:bg-gray-700 text-gray-900 dark:text-white"
                    />
                    <button
                      type="button"
                      onClick={handleAspectAdd}
                      className="px-3 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700"
                    >
                      Add
                    </button>
                  </div>
                  {formData.aspects.length > 0 && (
                    <ul className="mt-2 list-disc list-inside text-gray-800 dark:text-gray-300">
                      {formData.aspects.map((aspect, idx) => (
                        <li key={idx}>{aspect}</li>
                      ))}
                    </ul>
                  )}
                </div>

                <div className="mt-6 flex justify-between">
                  <button
                    type="button"
                    onClick={closeModal}
                    className="px-4 py-2 bg-gray-400 dark:bg-gray-600 text-white rounded-md hover:bg-gray-500"
                  >
                    Cancel
                  </button>
                  <button
                    type="submit"
                    className="px-4 py-2 bg-green-600 text-white rounded-md hover:bg-green-700"
                  >
                    Submit
                  </button>
                </div>
              </form>
            </div>
          </div>
        </>
      )}
    </>
  );
};

export default EventPopover;

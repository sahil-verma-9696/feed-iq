import React, { useState } from "react";
import { Upload, CalendarPlus, Settings2 } from "lucide-react";
import CreateEventPopover from "../../components/CreateEventPopover";

export default function Index() {
  const [open, setOpen] = useState(false);

  return (
    <div className="min-h-screen bg-white dark:bg-gray-900 p-8 text-gray-800 dark:text-white">
      <h1 className="text-3xl font-bold mb-8">Welcome to SentimentIQ</h1>
      <CreateEventPopover open={open} setOpen={setOpen} />
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        {/* Upload CSV Card */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
          <div className="flex items-center gap-4 mb-4">
            <Upload className="text-blue-500 w-8 h-8" />
            <h2 className="text-xl font-semibold">Upload Feedback CSV</h2>
          </div>
          <p className="text-sm">
            Import feedback responses from Google Forms or other sources.
          </p>
        </div>

        {/* Create Event Card */}
        <div
          onClick={() => setOpen(true)}
          className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer"
        >
          <div className="flex items-center gap-4 mb-4">
            <CalendarPlus className="text-green-500 w-8 h-8" />
            <h2 className="text-xl font-semibold">Create a New Event</h2>
          </div>
          <p className="text-sm">
            Define an event for collecting and analyzing sentiment data.
          </p>
        </div>

        {/* Add Aspects Card */}
        <div className="bg-gray-100 dark:bg-gray-800 p-6 rounded-xl shadow hover:shadow-lg transition-all cursor-pointer">
          <div className="flex items-center gap-4 mb-4">
            <Settings2 className="text-yellow-500 w-8 h-8" />
            <h2 className="text-xl font-semibold">
              Configure Feedback Aspects
            </h2>
          </div>
          <p className="text-sm">
            Choose what areas you want feedback on — like content, speaker, etc.
          </p>
        </div>
      </div>
    </div>
  );
}

const mongoose = require("mongoose");

const eventSchema = new mongoose.Schema({
  eventName: String,
  eventType: String, // e.g. "Club", "Seminar"
  clubName: String,
  eventDate: Date,
  aspects: [String], // e.g. ["food", "speaker", "airConditioner"]
});

module.exports = mongoose.model("Event", eventSchema);

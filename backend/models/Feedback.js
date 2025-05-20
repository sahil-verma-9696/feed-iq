const mongoose = require("mongoose");

const feedbackSchema = new mongoose.Schema({
  userName: String,
  eventId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "Event",
  },

  aspectFeedback: {
    type: Map,
    of: new mongoose.Schema(
      {
        text: String,
        sentiment: String,
        score: Number,
        keywords: [String],
        suggestion: String,
      },
      { _id: false }
    ),
  },

  overallFeedback: {
    text: String,
    sentiment: String,
    score: Number,
    keywords: [String],
    suggestion: String,
  },

  timestamp: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model("Feedback", feedbackSchema);
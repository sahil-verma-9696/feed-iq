const Feedback = require("../models/Feedback.js");
const { getLLMFeedbackAnalysis } = require("../utils/gemini");

exports.submitFeedback = async (req, res) => {
  try {
    const { userName, eventId, aspectFeedback, overallFeedback } = req.body;

    const analyzedAspects = {};
    for (const aspect in aspectFeedback) {
      const text = aspectFeedback[aspect];
      const result = await getLLMFeedbackAnalysis(text);

      analyzedAspects[aspect] = {
        text,
        sentiment: result?.sentiment,
        keywords: result?.keywords,
        suggestion: result?.suggestion,
      };
    }

    const overallResult = await getLLMFeedbackAnalysis(overallFeedback);
    const overallData = {
      text: overallFeedback,
      sentiment: overallResult.sentiment,
      keywords: overallResult.keywords,
      suggestion: overallResult.suggestion,
    };

    const feedback = new Feedback({
      userName,
      eventId,
      aspectFeedback: analyzedAspects,
      overallFeedback: overallData,
    });

    const saved = await feedback.save();
    res.status(201).json(saved);
  } catch (error) {
    console.error("LLM error:", error);
    res
      .status(500)
      .json({ error: "LLM sentiment failed", details: error.message });
  }
};

// Read all feedback for an event
exports.getFeedbackForEvent = async (req, res) => {
  try {
    const feedbacks = await Feedback.find({ eventId: req.params.eventId });
    res.status(200).json(feedbacks);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

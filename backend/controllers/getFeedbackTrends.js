const Feedback = require("../models/Feedback");
const moment = require("moment");

const getFeedbackTrends = async (req, res) => {
  try {
    const feedbacks = await Feedback.find();

    const trends = {};
    const dailySentiments = {};
    const overallSentimentCount = { positive: 0, neutral: 0, negative: 0 }; // ← NEW

    feedbacks.forEach((feedback) => {
      const { eventId, overallFeedback, aspectFeedback, createdAt } = feedback;

      const date = moment(createdAt).format("YYYY-MM-DD");

      if (!dailySentiments[date]) {
        dailySentiments[date] = { date, positive: 0, neutral: 0, negative: 0 };
      }

      const overallSentiment = overallFeedback?.sentiment || "neutral";

      if (["positive", "neutral", "negative"].includes(overallSentiment)) {
        dailySentiments[date][overallSentiment]++;
        overallSentimentCount[overallSentiment]++;
      }

      if (!trends[eventId]) {
        trends[eventId] = {
          eventId,
          totalFeedbacks: 0,
          overallKeywords: [],
          overallSuggestions: [],
          aspectTrends: {},
        };
      }

      const eventTrend = trends[eventId];
      eventTrend.totalFeedbacks++;

      if (overallFeedback?.keywords) {
        eventTrend.overallKeywords.push(...overallFeedback.keywords);
      }
      if (overallFeedback?.suggestion) {
        eventTrend.overallSuggestions.push(overallFeedback.suggestion);
      }

      if (aspectFeedback) {
        Array.from(aspectFeedback).forEach(([aspect, feedbackObj]) => {
          console.log("Aspect:", aspect);
      
          if (!trends[eventId].aspectTrends[aspect]) {
            trends[eventId].aspectTrends[aspect] = {
              positive: 0,
              negative: 0,
              neutral: 0,
              keywords: [],
              suggestions: [],
            };
          }
      
          const aspectTrend = trends[eventId].aspectTrends[aspect];
          const sentiment = feedbackObj?.sentiment || "neutral";
      
          if (aspectTrend[sentiment] !== undefined) {
            aspectTrend[sentiment]++;
          }
      
          if (feedbackObj?.keywords) {
            aspectTrend.keywords.push(...feedbackObj.keywords);
          }
      
          if (feedbackObj?.suggestion) {
            aspectTrend.suggestions.push(feedbackObj.suggestion);
          }
        });
      }
      
    });

    res.status(200).json({
      success: true,
      trends: Object.values(trends),
      dailyTrends: Object.values(dailySentiments), // 📈 Line chart data
      pieSummary: overallSentimentCount, // 🥧 Pie chart data
    });
  } catch (error) {
    console.error("Error fetching trends:", error);
    res.status(500).json({ success: false, error: "Server error" });
  }
};

module.exports = getFeedbackTrends;

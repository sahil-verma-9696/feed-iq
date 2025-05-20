const Feedback = require("../models/Feedback.js");

// Helper to increment count safely
function incrementCount(obj, key) {
  if (!key) return;
  obj[key] = (obj[key] || 0) + 1;
}

// Helper to filter out keys starting with $__ (Mongoose internals)
function isValidAspectKey(key) {
  return !key.startsWith("$__");
}

// GET /api/analytics/event-summary/:eventId
async function getEventSummary(req, res) {
  const { eventId } = req.params;

  try {
    const feedbacks = await Feedback.find({ eventId: eventId.toString() });

    if (!feedbacks.length) {
      return res.status(404).json({ message: "No feedback found" });
    }

    const total = feedbacks.length;
    let sumScore = 0;
    const sentimentCount = { positive: 0, neutral: 0, negative: 0 };
    const keywordMap = {};
    const suggestionCount = {};

    feedbacks.forEach((fb) => {
      const overall = fb.overallFeedback || {};
      sumScore += overall.score || 0;

      incrementCount(sentimentCount, overall.sentiment);

      (overall.keywords || []).forEach((kw) => {
        if (kw)
          keywordMap[kw.toLowerCase()] =
            (keywordMap[kw.toLowerCase()] || 0) + 1;
      });

      if (overall.suggestion) {
        const sug = overall.suggestion.trim();
        suggestionCount[sug] = (suggestionCount[sug] || 0) + 1;
      }
    });

    const topKeywords = Object.entries(keywordMap)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([kw]) => kw);

    // Sort suggestions by frequency desc and pick top 5
    const commonSuggestions = Object.entries(suggestionCount)
      .sort((a, b) => b[1] - a[1])
      .slice(0, 5)
      .map(([sug]) => sug);

    const averageSentimentScore = total ? +(sumScore / total).toFixed(2) : 0;

    res.json({
      eventId,
      totalFeedbacks: total,
      averageSentimentScore,
      sentimentDistribution: sentimentCount,
      topKeywords,
      commonSuggestions,
    });
  } catch (err) {
    console.error("Error in getEventSummary:", err);
    res.status(500).json({ error: err.message });
  }
}

// GET /api/analytics/event-aspects/:eventId
async function getEventAspects(req, res) {
  const { eventId } = req.params;

  try {
    const feedbacks = await Feedback.find({ eventId: eventId.toString() });

    if (!feedbacks.length) {
      return res.status(404).json({ message: "No feedback found" });
    }

    const aspectData = {};

    feedbacks.forEach(fb => {
      const aspects = fb.aspectFeedback || {};
      console.log("Aspect keys in this feedback:", Object.keys(aspects)); // debug print

      Object.entries(aspects).forEach(([aspect, data]) => {
        console.log(`Aspect: ${aspect}`, data); // debug print
        if (!aspectData[aspect]) {
          aspectData[aspect] = {
            count: 0,
            totalScore: 0,
            sentimentBreakdown: { positive: 0, neutral: 0, negative: 0 },
            keywordMap: {},
            suggestionCount: {},
          };
        }

        const stats = aspectData[aspect];
        stats.count++;
        stats.totalScore += data.score || 0;
        incrementCount(stats.sentimentBreakdown, data.sentiment);

        (data.keywords || []).forEach(kw => {
          if (kw) stats.keywordMap[kw.toLowerCase()] = (stats.keywordMap[kw.toLowerCase()] || 0) + 1;
        });

        if (data.suggestion) {
          const sug = data.suggestion.trim();
          stats.suggestionCount[sug] = (stats.suggestionCount[sug] || 0) + 1;
        }
      });
    });

    const formattedAspects = {};
    Object.entries(aspectData).forEach(([aspect, stats]) => {
      const topKeywords = Object.entries(stats.keywordMap)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([kw]) => kw);

      const topSuggestions = Object.entries(stats.suggestionCount)
        .sort((a, b) => b[1] - a[1])
        .slice(0, 5)
        .map(([sug]) => sug);

      formattedAspects[aspect] = {
        count: stats.count,
        averageScore: stats.count ? +(stats.totalScore / stats.count).toFixed(2) : 0,
        sentimentBreakdown: stats.sentimentBreakdown,
        commonKeywords: topKeywords,
        topSuggestions,
      };
    });

    res.json({ eventId, aspects: formattedAspects });
  } catch (err) {
    console.error("Error in getEventAspects:", err);
    res.status(500).json({ error: err.message });
  }
}


// GET /api/analytics/user-feedback/:eventId/:userName
async function getUserFeedback(req, res) {
  const { eventId, userName } = req.params;

  try {
    const feedback = await Feedback.findOne({
      eventId: eventId.toString(),
      userName,
    });

    if (!feedback) {
      return res.status(404).json({ message: "Feedback not found" });
    }

    res.json(feedback);
  } catch (err) {
    console.error("Error in getUserFeedback:", err);
    res.status(500).json({ error: err.message });
  }
}

module.exports = {
  getEventSummary,
  getEventAspects,
  getUserFeedback,
};

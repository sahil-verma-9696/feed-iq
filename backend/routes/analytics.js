const express = require("express");
const router = express.Router();
const {
  getEventSummary,
  getEventAspects,
  getUserFeedback,
} = require("../controllers/analytics.js");

router.get("/event-summary/:eventId", getEventSummary);

router.get("/event-aspects/:eventId", getEventAspects);

router.get("/user-feedback/:eventId/:userName", getUserFeedback);

module.exports = router;

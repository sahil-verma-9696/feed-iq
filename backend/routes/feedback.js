const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback.js");

router.post("/", feedbackController.submitFeedback);
router.get("/:eventId", feedbackController.getFeedbackForEvent);

module.exports = router;

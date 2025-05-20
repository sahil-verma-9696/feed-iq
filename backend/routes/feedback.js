const express = require("express");
const router = express.Router();
const feedbackController = require("../controllers/feedback.js");
const getFeedbackTrends = require("../controllers/getFeedbackTrends.js");

router.post("/:eventId", feedbackController.submitFeedback);
router.get('/trends', getFeedbackTrends); 
router.get("/:eventId", feedbackController.getFeedbackForEvent);

module.exports = router;

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();

// Import routes
const eventRoutes = require('./routes/event.js');
const feedbackRoutes = require('./routes/feedback.js');
const analyticsRoutes = require('./routes/analytics.js');

const app = express();

// Middlewares
app.use(cors());
app.use(express.json());

// Routes
app.use('/api/events', eventRoutes);
app.use('/api/feedbacks', feedbackRoutes);
app.use('/api/analytics', analyticsRoutes);

// Root
app.get('/', (req, res) => {
  res.send('College Event Feedback API is running 🚀');
});

// Error handler
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(500).json({ error: 'Something broke!' });
});

// MongoDB connection + Server start
const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/eventFeedback';

mongoose
  .connect(MONGO_URI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(() => {
    console.log('✅ Connected to MongoDB');
    app.listen(PORT, () => console.log(`🚀 Server started on http://localhost:${PORT}`));
  })
  .catch(err => console.error('MongoDB connection error:', err));

# FeedIQ

FeedIQ is feedback Sentiment Analyzer an intelligent web-based platform that empowers users to collect, analyze, visualize, and interact with feedback data—typically gathered via forms such as Google Forms, surveys, or custom events. It uses sentiment analysis and trend detection to extract meaningful insights and improve decision-making.

# Project snap 

## Home page
![image](https://github.com/user-attachments/assets/2b0776d8-5436-418d-b451-1c26a4cc319d)

## Dashboard page
![image](https://github.com/user-attachments/assets/5c46d6cd-1d3e-4ab0-92d2-1248e2556734)

## Report page
![image](https://github.com/user-attachments/assets/6d63f9e0-67c5-44db-a3e2-c98a713e8a85)

## Trend analysis
![image](https://github.com/user-attachments/assets/f51c2998-cb10-47fc-8403-2185e5d5e4a4)
![image](https://github.com/user-attachments/assets/0ad934e1-56bd-4404-b95e-d77f67fdf2a1)

## Create form
![image](https://github.com/user-attachments/assets/40d1bfe0-faf9-46d4-9fed-c321828f1dc7)


## Feedback Sentiment analysis responce by backend
```json
{
  "userName": "aaju Mehta",
  "eventId": "682beeb820cf2087ed651b24",
  "aspectFeedback": {
    "projector": {
      "text": "worst",
      "sentiment": "negative",
      "keywords": [
        "worst",
        "poor experience",
        "unacceptable",
        "disappointing",
        "improvements needed"
      ],
      "suggestion": "Conduct a thorough post-event survey with more detailed questions to understand specific areas of dissatisfaction and gather constructive feedback for improvement."
    },
    "networking": {
      "text": "booring man",
      "sentiment": "negative",
      "keywords": [
        "boring",
        "speaker",
        "engagement",
        "presentation",
        "monotonous"
      ],
      "suggestion": "Incorporate interactive elements, such as Q&A sessions, polls, or group activities, into presentations to increase audience engagement and prevent monotony."
    },
    "refreshments": {
      "text": "no any air",
      "sentiment": "negative",
      "keywords": [
        "lack of air",
        "poor ventilation",
        "uncomfortable environment",
        "air quality",
        "breathing issues"
      ],
      "suggestion": "Invest in better ventilation systems or ensure adequate air circulation to improve attendee comfort and well-being."
    }
  },
  "overallFeedback": {
    "text": "bad expreience",
    "sentiment": "negative",
    "keywords": [
      "bad experience",
      "negative",
      "poor"
    ],
    "suggestion": "Conduct a post-event survey with more specific questions to understand the reasons behind negative feedback and address them proactively."
  },
  "_id": "682bf9d93ea83f88fc1f1a0f",
  "timestamp": "2025-05-20T03:41:13.983Z",
  "__v": 0
}
```


## ⚙️ Tech Stack

- Frontend: React, Tailwind CSS, Redux Toolkit
- Charts & Visualization: Recharts
- PDF/CSV Export: jsPDF, PapaParse, FileSaver.js
- Icons: Lucide React
- State Management: Redux

### Backend

- Nodejs
- Express
- Render for deployment
- LLM(Geminie) integration for enhanced feedback analysis,chatbot.

## 📋 Prerequisites

### Common Requirements

- Git
- Make (GNU Make)
  - Windows: Install via [Chocolatey](https://chocolatey.org/install) or [Scoop](https://scoop.sh/)
  - macOS: Install via `xcode-select --install` or `brew install make`
  - Linux: Install via package manager (e.g., `sudo apt-get install make`)

### For Frontend Development

- Node.js (v22.13.1)
  - Windows: Download from [Node.js website](https://nodejs.org/)
  - macOS: Install via `brew install node@22` or use [nvm](https://github.com/nvm-sh/nvm)
  - Linux: Install via package manager or use [nvm](https://github.com/nvm-sh/nvm)
- npm or yarn package manager

## 🚀 Features

### 📥 CSV Upload & Event Management

Easily upload feedback data (CSV from Google Forms or other platforms) and organize them into custom events with specific aspects (e.g., UI, Support, Features).

### 📈 Dashboard & Visual Insights

Gain instant visibility into sentiment distribution, aspect-based sentiment breakdowns, and user satisfaction through rich interactive charts.

### 📊 Trend Analysis

Identify changes in user sentiment and key feedback themes over time. Visualize patterns and emerging issues with charts and summary lists.

### 🧠 Chat with Your Data

Ask natural language questions like “What’s the most common complaint?” or “How has sentiment changed this week?” and receive smart, AI-powered answers.

### 📤 Download Reports

Export your feedback reports in CSV or PDF format for sharing, documentation, or further analysis.

### 🌗 Dark Mode & Responsive Design

Sleek and accessible interface with full support for dark mode and all screen sizes.

## 🎯 Use Cases

- Product feedback tracking
- Event or workshop evaluation
- Educational course reviews
- Customer service performance analysis


## 🤝 Contributing

1. Fork this repository to your GitHub account
2. Create a new repository for your project
3. Clone your forked repository
4. Make your changes
5. Push to your new repository

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

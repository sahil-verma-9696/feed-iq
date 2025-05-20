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

### Environment Variables

Both frontend and backend use environment variables for configuration. Create the following `.env` files:

#### Backend (.env)

Create `backend/.env`:

```env
APP_NAME=Hackathon FastAPI Backend
API_VERSION=v1
```

#### Frontend (.env)

Create `frontend/.env`:

```env
VITE_API_URL=http://localhost:3001
```

Note: `.env` files are not tracked in Git for security reasons. Make sure to:

1. Never commit `.env` files to version control
2. Keep a `.env.example` file in your repository as a template
3. Document all required environment variables in your README

### Clone Your Fork

```bash
git clone https://github.com/guvi-research/react-python-fsd-v1.git
cd backend
```

### Frontend Setup

1. Navigate to the frontend directory:

```bash
cd frontend
```

2. Using Make (Recommended):

```bash
make run-local
```

This command will:

- Check Node.js version
- Install dependencies
- Start the development server
- Open the browser automatically

If you encounter issues with `make run-local`, you can run the commands manually:

```bash
# 1. Install dependencies
npm install

# 2. Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

### Backend Setup

1. Navigate to the backend directory:

```bash
cd backend
```

2. Using Make (Recommended):

```bash
make run-local
```

This command will:

- Check Python installation
- Set up virtual environment
- Install dependencies
- Start the FastAPI server
- Open the API documentation in browser

If you encounter issues with `make run-local`, you can run the commands manually:

```bash
# 1. Create virtual environment
# Windows
python -m venv venv
.\venv\Scripts\activate

# macOS/Linux
python3 -m venv venv
source venv/bin/activate

# 2. Install dependencies
pip install -r requirements.txt

# 3. Start the server
uvicorn app.main:app --reload --port 3001
```

The backend will be available at `http://localhost:3001`
API documentation will be available at `http://localhost:3001/docs`

## 🚀 Deployment

### Frontend Deployment (Netlify)

Using Make (Recommended):

```bash
cd frontend
make deploy
```

This command will:

- Check Node.js version
- Install dependencies
- Build the project
- Guide you through Netlify deployment

If you encounter issues with `make deploy`, you can deploy manually:

```bash
# 1. Build the project
npm run build

# 2. Deploy to Netlify
npx netlify deploy --prod --dir=dist
```

### Backend Deployment (Railway)

Using Make (Recommended):

```bash
cd backend
make deploy
```

This command will:

- Check Railway CLI installation
- Verify authentication
- Guide you through Railway deployment

If you encounter issues with `make deploy`, you can deploy manually:

```bash
# 1. Install Railway CLI
npm install @railway/cli

# 2. Login to Railway
railway login

# 3. Initialize project
railway init

# 4. Deploy
railway up
```

## ⚠️ IMPORTANT: Production Environment Setup

> **CRITICAL STEP**: After deploying your backend to Railway, you MUST create a `.env.production` file in your frontend directory with the production backend URL before building and deploying the frontend.

1. Deploy your backend to Railway first
2. Get your backend URL from Railway (it will look like `https://your-app-name.railway.app`)
3. Create `frontend/.env.production`:

```env
VITE_API_URL=https://your-app-name.railway.app
```

4. Only then proceed with frontend deployment

If you skip this step, your frontend will not be able to connect to your backend in production!

## 📚 Learning Resources

### Frontend

- [React Documentation](https://react.dev)
- [Vite Documentation](https://vitejs.dev/guide/)
- [Tailwind CSS Documentation](https://tailwindcss.com/docs)
- [Netlify Documentation](https://docs.netlify.com)

### Backend

- [FastAPI Documentation](https://fastapi.tiangolo.com/)
- [Python Documentation](https://docs.python.org/3/)
- [Railway Documentation](https://docs.railway.app)

## 🏗️ Project Structure

```
react-python-fsd-v1/
├── frontend/
│   ├── src/
│   │   ├── components/
│   │   ├── pages/
│   │   └── services/
│   ├── public/
│   ├── .env
│   ├── Makefile
│   └── package.json
└── backend/
    ├── app/
    │   ├── routes/
    │   ├── models/
    │   └── main.py
    ├── .env
    ├── Makefile
    └── requirements.txt
```

## 🔧 Available Make Commands

### Frontend

- `make run-local` - Start development server
- `make deploy` - Deploy to Netlify

### Backend

- `make run-local` - Start development server
- `make deploy` - Deploy to Railway

## 🤝 Contributing

1. Fork this repository to your GitHub account
2. Create a new repository for your project
3. Clone your forked repository
4. Make your changes
5. Push to your new repository

## 📝 License

This project is licensed under the MIT License - see the LICENSE file for details.

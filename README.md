# AI-Powered Career Path Advisor

An intelligent career guidance platform that uses AI to provide personalized career recommendations based on user interests, skills, and goals.

## Features

- User profile management with interests, skills, and goals
- AI-powered career path recommendations
- Personalized learning resources and timelines
- Interactive career path visualization using Chart.js
- Admin panel for managing roles and advice logic

## Tech Stack

- **Frontend**: React.js, Chart.js
- **Backend**: Node.js, Express.js
- **Database**: MongoDB
- **AI Integration**: OpenAI API

## Project Structure

```
├── client/                 # React frontend
├── server/                 # Node.js backend
├── .env                    # Environment variables
└── README.md              # Project documentation
```

## Setup Instructions

1. Clone the repository
2. Install dependencies:
   ```bash
   # Install backend dependencies
   cd server
   npm install

   # Install frontend dependencies
   cd ../client
   npm install
   ```

3. Create a `.env` file in the server directory with the following variables:
   ```
   MONGODB_URI=your_mongodb_uri
   OPENAI_API_KEY=your_openai_api_key
   JWT_SECRET=your_jwt_secret
   PORT=5000
   ```

4. Start the development servers:
   ```bash
   # Start backend server
   cd server
   npm run dev

   # Start frontend server
   cd ../client
   npm start
   ```

## Environment Variables

- `MONGODB_URI`: MongoDB connection string
- `OPENAI_API_KEY`: OpenAI API key for AI recommendations
- `JWT_SECRET`: Secret key for JWT authentication
- `PORT`: Backend server port (default: 5000)

## License

MIT 
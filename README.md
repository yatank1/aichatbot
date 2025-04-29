# FutureChatAI

A futuristic AI chatbot built with React, Node.js, and the Hugging Face API.

## Features

- Modern, futuristic UI design
- Real-time chat with AI
- Powered by Hugging Face's language models
- Responsive design for all devices

## Project Structure

```
aichatbot/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # UI components
│   │   ├── App.jsx         # Main application component
│   │   ├── main.jsx        # Entry point
│   │   ├── index.css       # Global styles
├── server/                 # Node.js backend
│   ├── server.js           # Express server
│   ├── .env                # Environment variables (API keys)
```

## Setup Instructions

### Prerequisites

- Node.js (v14 or higher)
- npm or yarn
- Hugging Face API key

### Backend Setup

1. Navigate to the server directory:
   ```
   cd server
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Create a `.env` file in the server directory and add your Hugging Face API key:
   ```
   PORT=5000
   HUGGINGFACE_API_KEY=your_api_key_here
   ```

4. Start the server:
   ```
   npm start
   ```
   For development with auto-reload:
   ```
   npm run dev
   ```

### Frontend Setup

1. Navigate to the client directory:
   ```
   cd client
   ```

2. Install dependencies:
   ```
   npm install
   ```

3. Start the development server:
   ```
   npm run dev
   ```

4. Open your browser and navigate to `http://localhost:5173`

## Usage

1. Type your message in the input field at the bottom of the screen
2. Press Enter or click the send button
3. Wait for the AI to respond

## Technologies Used

- **Frontend**:
  - React
  - Vite
  - Styled Components
  - Framer Motion
  - Axios

- **Backend**:
  - Node.js
  - Express
  - Axios
  - dotenv

- **AI**:
  - Hugging Face API

## License

MIT

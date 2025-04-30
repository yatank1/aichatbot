import { useState, useRef, useEffect } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import axios from 'axios';
import ChatMessage from './components/ChatMessage';
import ChatInput from './components/ChatInput';
import LoadingAnimation from './components/LoadingAnimation';
import { FaRobot } from 'react-icons/fa';

const AppContainer = styled.div`
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: linear-gradient(135deg, #1a1a2e, #16213e);
  color: #fff;
  font-family: 'Inter', sans-serif;
`;

const Header = styled(motion.header)`
  display: flex;
  align-items: center;
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-bottom: 1px solid rgba(255, 255, 255, 0.1);
`;

const Logo = styled.div`
  display: flex;
  align-items: center;
  gap: 10px;
  font-size: 24px;
  font-weight: 700;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
`;

const ChatContainer = styled.div`
  flex: 1;
  overflow-y: auto;
  padding: 20px;
  display: flex;
  flex-direction: column;
  scroll-behavior: smooth;

  &::-webkit-scrollbar {
    width: 6px;
  }

  &::-webkit-scrollbar-track {
    background: rgba(0, 0, 0, 0.1);
  }

  &::-webkit-scrollbar-thumb {
    background: rgba(255, 255, 255, 0.1);
    border-radius: 3px;
  }
`;

const InputContainer = styled.div`
  padding: 20px;
  background: rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border-top: 1px solid rgba(255, 255, 255, 0.1);
`;

const WelcomeMessage = styled(motion.div)`
  text-align: center;
  margin: 40px 0;
  padding: 20px;
  background: rgba(32, 33, 35, 0.5);
  border-radius: 12px;
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  max-width: 600px;
  margin-left: auto;
  margin-right: auto;
`;

const GlowingOrb = styled(motion.div)`
  width: 60px;
  height: 60px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  margin: 0 auto 20px;
  box-shadow: 0 0 20px rgba(110, 142, 251, 0.6);
  display: flex;
  align-items: center;
  justify-content: center;
`;

function App() {
  const [messages, setMessages] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);
  const chatContainerRef = useRef(null);

  useEffect(() => {
    // Scroll to bottom when messages change
    if (chatContainerRef.current) {
      chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;
    }
  }, [messages]);

  const handleSendMessage = async (message) => {
    try {
      // Add user message to chat
      setMessages(prev => [...prev, { text: message, isBot: false }]);
      setIsLoading(true);
      setError(null);

      // Call backend API
      // Use relative URL or environment variable for API endpoint
      const API_URL = import.meta.env.VITE_API_URL || '/api';
      const response = await axios.post(`${API_URL}/chat`, { message });

      // Add bot response to chat
      setMessages(prev => [...prev, { text: response.data.response, isBot: true }]);
    } catch (err) {
      console.error('Error sending message:', err);

      // Extract error message from response if available
      let errorMessage = 'Failed to get response from AI. Please try again.';

      if (err.response?.data?.error) {
        errorMessage = err.response.data.error;
        console.error('Server error details:', err.response.data.details);
      } else if (err.message) {
        errorMessage = `Error: ${err.message}`;
      }

      setError(errorMessage);

      // Add error message to chat
      setMessages(prev => [...prev, {
        text: 'Sorry, I encountered an error. Please try again.',
        isBot: true
      }]);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <AppContainer>
      <Header
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        <Logo>
          <FaRobot size={28} />
          FutureChatAI
        </Logo>
      </Header>

      <ChatContainer ref={chatContainerRef}>
        {messages.length === 0 ? (
          <WelcomeMessage
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            transition={{ duration: 0.5 }}
          >
            <GlowingOrb
              animate={{
                boxShadow: ['0 0 20px rgba(110, 142, 251, 0.6)', '0 0 30px rgba(167, 119, 227, 0.8)', '0 0 20px rgba(110, 142, 251, 0.6)']
              }}
              transition={{
                duration: 2,
                repeat: Infinity,
                repeatType: "reverse"
              }}
            >
              <FaRobot color="#fff" size={30} />
            </GlowingOrb>
            <h2>Welcome to FutureChatAI</h2>
            <p>Ask me anything and I'll do my best to help you!</p>
          </WelcomeMessage>
        ) : (
          messages.map((msg, index) => (
            <ChatMessage
              key={index}
              message={msg.text}
              isBot={msg.isBot}
            />
          ))
        )}

        {isLoading && <LoadingAnimation />}

        {error && (
          <div style={{ color: 'red', textAlign: 'center', margin: '10px 0' }}>
            {error}
          </div>
        )}
      </ChatContainer>

      <InputContainer>
        <ChatInput onSendMessage={handleSendMessage} isLoading={isLoading} />
      </InputContainer>
    </AppContainer>
  );
}

export default App;

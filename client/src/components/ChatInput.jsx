import React, { useState } from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaPaperPlane } from 'react-icons/fa';

const InputContainer = styled.div`
  position: relative;
  width: 100%;
  margin-top: 20px;
`;

const StyledInput = styled.input`
  width: 100%;
  padding: 18px 60px 18px 20px;
  border-radius: 12px;
  border: none;
  background: rgba(64, 65, 79, 0.7);
  color: #fff;
  font-size: 16px;
  outline: none;
  box-shadow: 0 4px 12px rgba(0, 0, 0, 0.2);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  transition: all 0.3s ease;

  &:focus {
    box-shadow: 0 0 0 2px rgba(110, 142, 251, 0.5);
  }

  &::placeholder {
    color: rgba(255, 255, 255, 0.5);
  }
`;

const SendButton = styled(motion.button)`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  border: none;
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
  
  &:disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
`;

const ChatInput = ({ onSendMessage, isLoading }) => {
  const [message, setMessage] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (message.trim() && !isLoading) {
      onSendMessage(message);
      setMessage('');
    }
  };

  return (
    <InputContainer>
      <form onSubmit={handleSubmit}>
        <StyledInput
          type="text"
          placeholder="Type your message here..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={isLoading}
        />
        <SendButton
          type="submit"
          disabled={!message.trim() || isLoading}
          whileHover={{ scale: 1.05 }}
          whileTap={{ scale: 0.95 }}
        >
          <FaPaperPlane color="#fff" size={16} />
        </SendButton>
      </form>
    </InputContainer>
  );
};

export default ChatInput;

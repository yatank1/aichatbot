import React from 'react';
import styled from 'styled-components';
import { motion } from 'framer-motion';
import { FaRobot, FaUser } from 'react-icons/fa';

const MessageContainer = styled(motion.div)`
  display: flex;
  margin-bottom: 20px;
  align-items: flex-start;
`;

const Avatar = styled.div`
  width: 40px;
  height: 40px;
  border-radius: 50%;
  display: flex;
  align-items: center;
  justify-content: center;
  margin-right: 12px;
  background: ${props => props.isBot ? 'linear-gradient(135deg, #6e8efb, #a777e3)' : 'linear-gradient(135deg, #22c1c3, #fdbb2d)'};
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
`;

const MessageContent = styled.div`
  background: ${props => props.isBot ? 'rgba(32, 33, 35, 0.8)' : 'rgba(52, 53, 65, 0.8)'};
  padding: 15px;
  border-radius: 12px;
  max-width: 80%;
  box-shadow: 0 4px 8px rgba(0, 0, 0, 0.1);
  backdrop-filter: blur(10px);
  border: 1px solid rgba(255, 255, 255, 0.1);
  color: #fff;
  font-size: 16px;
  line-height: 1.5;
`;

const ChatMessage = ({ message, isBot }) => {
  return (
    <MessageContainer
      initial={{ opacity: 0, y: 20 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ duration: 0.3 }}
    >
      <Avatar isBot={isBot}>
        {isBot ? <FaRobot color="#fff" size={20} /> : <FaUser color="#fff" size={20} />}
      </Avatar>
      <MessageContent isBot={isBot}>
        {message}
      </MessageContent>
    </MessageContainer>
  );
};

export default ChatMessage;

import React from 'react';
import styled, { keyframes } from 'styled-components';

const pulse = keyframes`
  0%, 100% {
    opacity: 0.2;
    transform: scale(0.8);
  }
  50% {
    opacity: 1;
    transform: scale(1);
  }
`;

const LoadingContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 20px;
`;

const Dot = styled.div`
  width: 10px;
  height: 10px;
  border-radius: 50%;
  background: linear-gradient(135deg, #6e8efb, #a777e3);
  margin: 0 5px;
  animation: ${pulse} 1.5s infinite ease-in-out;
  animation-delay: ${props => props.delay}s;
  box-shadow: 0 2px 5px rgba(0, 0, 0, 0.2);
`;

const LoadingAnimation = () => {
  return (
    <LoadingContainer>
      <Dot delay={0} />
      <Dot delay={0.2} />
      <Dot delay={0.4} />
    </LoadingContainer>
  );
};

export default LoadingAnimation;

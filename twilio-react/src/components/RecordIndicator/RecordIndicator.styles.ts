import styled, { keyframes } from 'styled-components';

const recording = keyframes`
  0% {
    transform: scale(1);
  }
  50% {
    transform: scale(1.5);
  }
  100% {
    transform: scale(1);
  }
`;

export const RecordIndicator = styled.span`
  position: absolute;
  width: 12px;
  height: 12px;
  border-radius: 50%;
  top: -6px;
  right: -6px;

  &.ready {
    background-color: #d32f2f;
  }

  &.is-recording {
    background-color: #d32f2f;
    animation: ${recording} 1s infinite linear;
  }

  background-color: #737373;
  animation: none;
`;

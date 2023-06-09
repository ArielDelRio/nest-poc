import styled from 'styled-components';

export const CallPanelSectionContainer = styled.div`
  width: 60%;
`;

const CallPanelSectionBox = styled.div`
  border: 1px solid #848484;
  line-height: 0;
  margin-bottom: 1em;
  font-size: 2.5em;
`;

export const CallPanelSectionHeader = styled(CallPanelSectionBox)``;

export const CallPanelSectionMain = styled(CallPanelSectionBox)`
  text-align: start;
  padding: 0.5em 1em;
`;

export const CallPanelControl = styled.div`
  display: flex;
  justify-content: space-between;
  padding: 0.6em 1em;
`;

export const TelInput = styled.input`
  padding: 10px;
  border: 1px solid #ddd;
  border-radius: 5px;
  box-shadow: none;
  font-size: 16px;
  outline: none;

  &:focus {
    border-color: #848484;
  }
`;

export const LabelInput = styled.label`
  font-size: 16px;
  font-weight: bold;
  margin-bottom: 8px;
  display: block;
`;

export const ErrorLabel = styled.span`
  color: red;
  font-size: 14px;
  font-weight: bold;
  margin-top: 8px;
  display: block;
`;

export const ButtonsSection = styled.div`
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  justify-content: space-between;
  align-items: center;
  padding: 0.2em 1em;
  gap: 0.2em;
`;

export const ButtonsSectionHeader = styled(ButtonsSection)`
  display: flex;
  justify-content: center;
  gap: 1em;
`;

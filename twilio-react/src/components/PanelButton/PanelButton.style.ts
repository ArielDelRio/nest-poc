import styled from 'styled-components';

export const PanelButton = styled.button`
  width: 10em;
  height: 3em;
  margin-bottom: 1em;
  outline: 0;
  font-weight: 300;
  background: #fff;
  border: 1px solid #737373;
  box-shadow: '0.25px 0.25px 0 0 rgba(97, 97, 97, 0.5)';

  &:active {
    position: relative;
    top: 1px;
    left: 1px;
  }
`;

export const IconButton = styled(PanelButton)`
  width: 4em;
`;

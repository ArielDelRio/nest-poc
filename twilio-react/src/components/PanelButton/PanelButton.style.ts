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
  position: relative;

  &:active {
    position: relative;
    top: 1px;
    left: 1px;
  }

  &.status:after {
    content: '';
    position: absolute;
    width: 12px;
    height: 12px;
    border-radius: 50%;
    top: -6px;
    right: -6px;
  }

  &.status.active:after {
    background-color: #3cba54;
  }

  &.status.inactive:after {
    background-color: #db3236;
  }
`;

export const IconButton = styled(PanelButton)`
  width: 4em;
`;

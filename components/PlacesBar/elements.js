import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100%;
  display: flex;
  padding: 0px;
  margin: 0px;
  overflow: hidden;
`;

export const Note = styled.div`
  position: absolute;
  white-space: nowrap;
  justify-content: center;
  font-size: 13px;
  background: rgba(0, 0, 0, 0.6);
  color: #fff;
  border-radius: 5px;
  padding: 5px 10px 5px 10px;
  margin: 5px 10px 5px 10px;
  left: ${props => props.left}px;
  &::after {
    content: '';
    position: absolute;
    bottom: -5px;
    border-width: 5px 5px 0;
    border-style: solid;
    border-color: #000000 transparent;
    border-top-color: rgba(0, 0, 0, 0.6);
    display: block;
    width: 0;
  }
`;

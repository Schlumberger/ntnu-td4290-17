import styled from 'styled-components';

export const Wrapper = styled.div`
  max-width: 100%;
  max-height: 100%;
  width: 97vw; //had to put this here instead of in App/elements, dont know why
  height: 97vh; //its not 100% because there is some padding/margin on top and left, so it forced scroll bars.
  padding: 0px;
  margin: 0px;
  //display: table;
  //overflow: hidden;
`;

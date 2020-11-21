import styled from 'styled-components';

export const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 85px;
  margin-bottom: 20px;
  width: 560px;
  border-radius: .5em;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
`;

export const TitleBlock = styled.div`
  padding: 0 20px 0 20px;

  h2 {
    margin-block-end: 0;
  }
`;

export const ContentBlock = styled.div`
  padding: 0 20px 20px 20px;
  margin-top: 15px;
`;

export const SubmitButton = styled.button`
  position: relative;
  top: 100px;
`;

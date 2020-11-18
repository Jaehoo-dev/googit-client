import React, { useState } from 'react';
import styled from 'styled-components';

const Wrapper = styled.div`
  position: absolute;
  left: 50%;
  transform: translateX(-50%);
  margin-top: 70px;
  width: 560px;
  padding: 25px;
  border-radius: .5em;
  box-shadow: 1px 1px 5px 1px rgba(0, 0, 0, 0.2);
  /* display: flex;
  flex-flow: column;
  height: 75%;
  overflow: auto; */
`;

const ToolBarWrapper = styled.div`
  height: 50px;
  background-color: gray;
`;

const TitleBlock = styled.div`
  h2 {
    margin-block-start: 0;
    margin-block-end: 0;
  }
`;

const ContentBlock = styled.div`
  margin-top: 15px;
`;

// const EditModeToggleButton = styled.button`
//   height: 50px;
//   width: 50px;
//   border: none;
//   border-radius: 50%;
//   background-color: coral;
//   position: absolute;
//   bottom: 5%;
//   right: 5%;
// `;

const title = 'Title';
const content = 'Magna incididunt excepteur do ipsum minim Lorem occaecat reprehenderit eiusmod officia ex. Minim id dolor occaecat Lorem ad pariatur ut enim nostrud velit ut. Eu esse ex tempor commodo laboris est. Duis proident irure excepteur aute ad eiusmod adipisicing dolore Lorem et tempor sunt ut ea. Duis ullamco id ipsum consequat ad id ad ut. Cillum cillum mollit ut cillum velit commodo in.';

export default function Editor() {
  const [isEditMode, setIsEditMode] = useState(false);

  function focusHandler() {
    setIsEditMode(true);
  }

  function blurHandler() {
    setIsEditMode(false);
  }

  return (
    <>
      {
        isEditMode && <ToolBarWrapper />
      }
      <Wrapper>

        <TitleBlock
          onFocus={focusHandler}
          onBlur={blurHandler}
          contentEditable
        >
          <h2>{title}</h2>
        </TitleBlock>
        <ContentBlock
          onFocus={focusHandler}
          onBlur={blurHandler}
          contentEditable
        >
          <p>{content}</p>
          <p>{content}</p>
          <p>{content}</p>
          <p>{content}</p>
        </ContentBlock>
      </Wrapper>
    </>
  );
}

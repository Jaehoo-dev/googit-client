import styled from 'styled-components';

export const Wrapper = styled.div`
  margin-top: 6em;
`;

export const BranchListHeadWrapper = styled.div`
  width: 80%;
  height: 2em;
  margin: 0 5em;
  padding: 0 3em;
  font-size: 1em;
  text-align: center;
  border-bottom: 1px solid black;

  section {
    display: grid;
    grid-template-columns: 2em 1fr 1fr 15em 5em;
    grid-gap: 1em;
    align-items: center;
    padding: 0 2em;
  }
`;

export const BranchListEntryWrapper = styled.div`
  margin-top: 1em;
  height: 3em;
  display: grid;
  grid-template-columns: 2em 1fr 1fr 15em 5em;
  grid-gap: 1em;
  align-items: center;
  border: 2.5px solid #f08080;
  border-radius: 1em;
  padding: 0 2em;
`;

export const BranchListBodyWrapper = styled.div`
  width: 80%;
  height: 100vh;
  margin: 0 5em;
  padding: 1em 3em;
  font-size: 1em;
  text-align: center;
  display: flex;
  flex-direction: column;
`;

export const BranchContainer = styled.div`
  margin-top: 1em;
  padding-bottom: 1em;
`;

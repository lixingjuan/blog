import React from "react";

import styled from "styled-components";

const StyledWrapper = styled.div`
  button {
    width: 150px;
    height: 60px;
    border: none;
    &::focus {
      border: none;
    }
  }

  .buttonB {
    background-clip: content-box, padding-box;
    padding: 1px;
    background-image: linear-gradient(white, white),
      linear-gradient(180deg, #7f74f8 0%, #7ac2fa 100%);
  }
`;
const App = () => {
  return (
    <StyledWrapper>
      <button type="button" className="buttonB">
        1px边框
      </button>
    </StyledWrapper>
  );
};

export default App;

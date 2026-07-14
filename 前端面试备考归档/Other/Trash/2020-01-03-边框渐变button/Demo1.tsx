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

  .buttonA {
    background-image: linear-gradient(180deg, #7f74f8 0%, #7ac2fa 100%);
  }
`;

const App = () => (
  <StyledWrapper>
    <button type="button" className="buttonA">
      仅背景渐变
    </button>
  </StyledWrapper>
);

export default App;

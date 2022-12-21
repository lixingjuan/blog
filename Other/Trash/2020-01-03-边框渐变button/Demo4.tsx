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

  .buttonD {
    background-clip: content-box, padding-box;
    padding: 1px;
    background-image: linear-gradient(white, white),
      linear-gradient(180deg, #7f74f8 0%, #7ac2fa 100%);
    position: relative;

    &::after {
      content: attr(desc);
      position: absolute;
      top: 0px;
      left: 0px;
      width: 100%;
      height: 100%;
      display: flex;
      align-items: center;
      justify-content: center;
      background-clip: text; /* 属性值，text兼容性差 */
      -webkit-background-clip: text; /* 属性值，text兼容性差 */
      color: transparent;
      background-image: linear-gradient(180deg, #7f74f8 0%, #7ac2fa 100%);
    }
  }
`;

const App = () => (
  <StyledWrapper>
    <button type="button" className="buttonD" desc="边框+文字渐变">
      边框+文字渐变
    </button>
  </StyledWrapper>
);

export default App;

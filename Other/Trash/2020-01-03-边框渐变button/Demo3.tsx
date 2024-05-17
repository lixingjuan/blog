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

  .buttonC {
    background-clip: content-box, padding-box;
    padding: 1px;
    background-image: linear-gradient(white, white),
      linear-gradient(180deg, #7f74f8 0%, #7ac2fa 100%);
    position: relative;

    svg {
      width: 100%;
      height: 100%;
    }
  }
`;
const App = () => {
  return (
    <>
      <StyledWrapper>
        <button type="button" className="buttonC" desc="边框+文字渐变">
          <svg>
            <defs>
              <linearGradient id="cool" x1="0%" y1="0%" x2="0%" y2="100%">
                <stop offset="0%" stopColor="#7F76F8 " stopOpacity="1" />
                <stop offset="100%" stopColor="#7EC4FA" stopOpacity="1" />
              </linearGradient>
            </defs>

            <text
              x="50%"
              y="50%"
              dy="2"
              fill={`url(#cool)`}
              style={{
                fontSize: "18px",
                alignmentBaseline: "middle",
                textAnchor: "middle",
              }}
            >
              边框+文字渐变
            </text>
          </svg>
        </button>
      </StyledWrapper>
    </>
  );
};

export default App;

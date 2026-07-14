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

  .buttonB {
    background-clip: content-box, padding-box;
    padding: 1px;
    background-image: linear-gradient(white, white),
      linear-gradient(180deg, #7f74f8 0%, #7ac2fa 100%);
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
const App = () => {
  return (
    <>
      <StyledWrapper>
        <h1> 仅背景渐变</h1>
        <button type="button" className="buttonA">
          背景渐变
        </button>

        <h1> border渐变</h1>
        <h6>（原理即适用padding模拟border，PC）</h6>
        <button type="button" className="buttonB">
          1px边框
        </button>

        <h1> border + 文字 渐变</h1>
        <h6>（原理即适用padding模拟border）</h6>
        <h3> 方案一</h3>

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

        <h3> 方案二</h3>
        <button type="button" className="buttonD" desc="边框+文字渐变">
          边框+文字渐变
        </button>
      </StyledWrapper>
    </>
  );
};

export default App;

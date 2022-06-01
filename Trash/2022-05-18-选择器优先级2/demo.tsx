import React from "react";
import styled from "styled-components";

const StyledDemo = styled.div`
  /* ❗️❗️❗️ Selector Specificity: (0, 1, 0) */
  .red {
    color: red;
  }
  /* ❗️❗️❗️ Selector Specificity: (0, 0, 12) */
  div > div > div > div > div > div > div > div > div > div > div > div {
    color: blue;
  }
`;

const Demo = () => (
  <StyledDemo>
    <div>
      <div>
        <div>
          <div>
            <div>
              <div>
                <div>
                  <div>
                    <div>
                      <div>
                        <div>
                          <div className="red">我是什么颜色</div>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </StyledDemo>
);

export default Demo;

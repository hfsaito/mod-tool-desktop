import styled from "styled-components";

import { handleStyleCommon, Style, StyleCommon } from "../1.atoms";

export const Container = styled.div<StyleCommon>`
  margin: 0 auto;
  width: 300px;

  @media ${Style.device.laptopL} {
    max-width: ${Style.breakpoint.laptopL}px;
  }
  
  ${handleStyleCommon}
`;

import styled from "styled-components";

import { Style, StyleCommon } from "@components/1.atoms";

export const Button = styled.button<StyleCommon>`
  color: ${({ color }) => Style.color[color ?? 'secondary'].on};
  background-color: ${({ color }) => Style.color[color ?? 'secondary'].background};
  border: none;
  font-family: Inter, Roobert, "Helvetica Neue", Helvetica, Arial, sans-serif;
  font-size: 13px;
  font-weight: 600;
  border-radius: 4px;
  line-height: 19.5px;
  padding: 5px 8px;
  cursor: pointer;

  &:hover {
    color: ${({ color }) => Style.color[color ?? 'secondary'].hover?.on};
    background-color: ${({ color }) => Style.color[color ?? 'secondary'].hover?.background};
  }
`;

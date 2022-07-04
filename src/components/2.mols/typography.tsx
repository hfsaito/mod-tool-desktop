import { CSSProperties } from 'react';
import { Link as RouterLink } from 'react-router-dom';
import styled from "styled-components";

import { handleStyleCommon, Style, StyleCommon, StyleType } from '../1.atoms';

type TypographyProps = StyleCommon & {
  readonly color?: keyof StyleType['color'];
  readonly size?: keyof StyleType['typography']['size'];
  readonly align?: CSSProperties['textAlign'];
};

export const H1 = styled.h1<TypographyProps>`
  color: ${props => Style.color[props.color ?? 'body'].on};
  font-size: ${props => Style.typography.size[props.size ?? 'xl']}px;
  font-family: ${Style.typography.font};
  margin: ${Style.space.xs}px 0 ${Style.space.md}px 0;
  padding: 0 0 ${Style.space.xs}px 0;
  border-bottom: medium solid ${props => Style.color[props.color ?? 'body'].on};
  ${handleStyleCommon}
`;

export const H2 = styled.h2<TypographyProps>`
  color: ${props => Style.color[props.color ?? 'body'].on};
  font-size: ${props => Style.typography.size[props.size ?? 'lg']}px;
  font-family: ${Style.typography.font};
  margin: ${Style.space.xs}px 0 ${Style.space.md}px 0;
  padding: 0 0 ${Style.space.xs}px 0;
  border-bottom: medium solid ${props => Style.color[props.color ?? 'body'].on};
  ${handleStyleCommon}
`;

export const H3 = styled.h3<TypographyProps>`
  color: ${props => Style.color[props.color ?? 'body'].on};
  font-size: ${props => Style.typography.size[props.size ?? 'md']}px;
  font-family: ${Style.typography.font};
  margin: ${Style.space.xs}px 0 ${Style.space.md}px 0;
  ${handleStyleCommon}
`;

export const H4 = styled.h4<TypographyProps>`
  color: ${props => Style.color[props.color ?? 'body'].on};
  font-size: ${props => Style.typography.size[props.size ?? 'md']}px;
  font-family: ${Style.typography.font};
  margin: ${Style.space.xs}px 0 ${Style.space.md}px 0;
  ${handleStyleCommon}
`;

export const H5 = styled.h5<TypographyProps>`
  color: ${props => Style.color[props.color ?? 'body'].on};
  font-size: ${props => Style.typography.size[props.size ?? 'sm']}px;
  font-family: ${Style.typography.font};
  margin: ${Style.space.xs}px 0 ${Style.space.md}px 0;
  ${handleStyleCommon}
`;

export const H6 = styled.h6<TypographyProps>`
  color: ${props => Style.color[props.color ?? 'body'].on};
  font-size: ${props => Style.typography.size[props.size ?? 'sm']}px;
  font-family: ${Style.typography.font};
  margin: ${Style.space.xs}px 0 ${Style.space.md}px 0;
  ${handleStyleCommon}
`;

export const P = styled.p<TypographyProps>`
  color: ${props => Style.color[props.color ?? 'body'].on};
  font-size: ${props => Style.typography.size[props.size ?? 'xs']}px;
  font-family: ${Style.typography.font};
  margin: 0 0 ${Style.space.md}px 0;
  ${handleStyleCommon}
`;

export const Pre = styled.pre<TypographyProps>`
  color: ${props => Style.color[props.color ?? 'body'].on};
  font-size: ${props => Style.typography.size[props.size ?? 'xs']}px;
  font-family: ${Style.typography.font};
  margin: 0 0 ${Style.space.md}px 0;
  ${handleStyleCommon}
`;

type LinkProps = TypographyProps & {
  readonly active?: boolean;
  readonly muted?: boolean;
};

export const Link = styled(RouterLink)<LinkProps>`
  color: ${props => Style.color[props.color ?? 'body'].on};
  font-size: ${props => Style.typography.size[props.size ?? 'xs']}px;
  font-family: ${Style.typography.font};
  display: inline-block; 
  text-decoration: none;
  ${props => (props.muted ?? false) ? 'pointer-events: none;' : ''}
  ${handleStyleCommon}
`;

export const ExtLink = styled.a<TypographyProps>`
  color: ${props => Style.color[props.color ?? 'body'].on};
  font-size: ${props => Style.typography.size[props.size ?? 'xs']}px;
  font-family: ${Style.typography.font};
  text-decoration: none;
  ${handleStyleCommon}
`;

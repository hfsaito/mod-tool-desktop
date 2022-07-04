import { CSSProperties } from 'react';

const TYPOGRAPHY_BASE = 16;
const SPACE_BASE = 8;

const breakpoint = {
  mobileS: 320,
  mobileM: 375,
  mobileL: 425,
  tablet: 768,
  laptop: 1024,
  laptopL: 1440,
  fourK: 2560
};

type ColorType = {
  on: string;
  background: string;
};

export type StyleType = {
  typography: {
    size: {
      xs: number;
      sm: number;
      md: number;
      lg: number;
      xl: number;
    };
    font: string;
  };
  space: {
    none: 0;
    auto: 'auto';
    xs: number;
    sm: number;
    md: number;
    lg: number;
    xl: number;
  };
  color: {
    primary: ColorType;
    secondary: ColorType;
    success: ColorType;
    warning: ColorType;
    danger: ColorType;
    info: ColorType;
    body: ColorType;
    muted: ColorType;
  };
  breakpoint: {
    mobileS: number;
    mobileM: number;
    mobileL: number;
    tablet: number;
    laptop: number;
    laptopL: number;
    fourK: number;
  };
  device: {
    mobileS: string;
    mobileM: string;
    mobileL: string;
    tablet: string;
    laptop: string;
    laptopL: string;
    fourK: string;
  };
};

export const Style: StyleType = {
  typography: {
    size: {
      xs: TYPOGRAPHY_BASE,
      sm: TYPOGRAPHY_BASE * 1.5,
      md: TYPOGRAPHY_BASE * 2,
      lg: TYPOGRAPHY_BASE * 3,
      xl: TYPOGRAPHY_BASE * 4
    },
    font: 'sans-serif'
  },
  space: {
    none: 0,
    auto: 'auto',
    xs: SPACE_BASE,
    sm: SPACE_BASE * 1.5,
    md: SPACE_BASE * 2,
    lg: SPACE_BASE * 3,
    xl: SPACE_BASE * 4
  },
  color: {
    primary: {
      on: 'steelblue',
      background: 'whtie'
    },
    secondary: {
      on: '#94d2bd',
      background: 'whtie'
    },
    success: {
      on: 'limagreen',
      background: 'white'
    },
    warning: {
      on: 'darkorange',
      background: 'white'
    },
    danger: {
      on: 'indianred',
      background: 'white'
    },
    info: {
      on: 'skyblue',
      background: 'whtie'
    },
    body: {
      on: 'black',
      background: 'white'
    },
    muted: {
      on: 'lightgray',
      background: 'whtie'
    }
  },
  breakpoint,
  device: {
    mobileS: `(min-width: ${breakpoint.mobileS}px)`,
    mobileM: `(min-width: ${breakpoint.mobileM}px)`,
    mobileL: `(min-width: ${breakpoint.mobileL}px)`,
    tablet: `(min-width: ${breakpoint.tablet}px)`,
    laptop: `(min-width: ${breakpoint.laptop}px)`,
    laptopL: `(min-width: ${breakpoint.laptopL}px)`,
    fourK: `(min-width: ${breakpoint.fourK}px)`,
  }
};

type SpaceType = keyof StyleType['space']
  | [keyof StyleType['space'], keyof StyleType['space']]
  | [keyof StyleType['space'], keyof StyleType['space'], keyof StyleType['space']]
  | [keyof StyleType['space'], keyof StyleType['space'], keyof StyleType['space'], keyof StyleType['space']];
type SpaceDualType = keyof StyleType['space']
  | [keyof StyleType['space'], keyof StyleType['space']];
type SpaceUnitType = keyof StyleType['space'];

export type StyleCommon = {
  d?: CSSProperties['display'];
  m?: SpaceType;
  mx?: SpaceDualType;
  my?: SpaceDualType;
  mt?: SpaceUnitType;
  mb?: SpaceUnitType;
  ml?: SpaceUnitType;
  mr?: SpaceUnitType;
  p?: SpaceType;
  px?: SpaceDualType;
  py?: SpaceDualType;
  pt?: SpaceUnitType;
  pb?: SpaceUnitType;
  pl?: SpaceUnitType;
  pr?: SpaceUnitType;
}

const handleDisplay = (props: StyleCommon) => {
  return props.d ? `display: ${props.d};` : '';
}
const handleMargin = (props: StyleCommon) => {
  const margin: {
    top: number | 'auto' | null;
    right: number | 'auto' | null;
    bottom: number | 'auto' | null;
    left: number | 'auto' | null;
  } = {
    top: null,
    right: null,
    bottom: null,
    left: null
  };
  if (props.m) {
    if (typeof props.m === 'string') {
      margin.top = Style.space[props.m];
      margin.right = Style.space[props.m];
      margin.bottom = Style.space[props.m];
      margin.left = Style.space[props.m];
    } else {
      switch (props.m.length) {
        case 2:
          margin.top = Style.space[props.m[0]];
          margin.right = Style.space[props.m[1]];
          margin.bottom = Style.space[props.m[0]];
          margin.left = Style.space[props.m[1]];
          break;
        case 3:
          margin.top = Style.space[props.m[0]];
          margin.right = Style.space[props.m[1]];
          margin.bottom = Style.space[props.m[2]];
          margin.left = Style.space[props.m[1]];
          break;
        case 4:
          margin.top = Style.space[props.m[0]];
          margin.right = Style.space[props.m[1]];
          margin.bottom = Style.space[props.m[2]];
          margin.left = Style.space[props.m[3]];
          break;
      }
    }
  }
  if (props.mx) {
    if (typeof props.mx === 'string') {
      margin.right = Style.space[props.mx];
      margin.left = Style.space[props.mx];
    } else {
      margin.right = Style.space[props.mx[0]];
      margin.left = Style.space[props.mx[1]];
    }
  }
  if (props.my) {
    if (typeof props.my === 'string') {
      margin.top = Style.space[props.my];
      margin.bottom = Style.space[props.my];
    } else {
      margin.top = Style.space[props.my[0]];
      margin.bottom = Style.space[props.my[1]];
    }
  }
  if (props.mt) {
    margin.top = Style.space[props.mt];
  }
  if (props.mr) {
    margin.right = Style.space[props.mr];
  }
  if (props.mb) {
    margin.bottom = Style.space[props.mb];
  }
  if (props.ml) {
    margin.left = Style.space[props.ml];
  }
  return `
    ${margin.top ? `margin-top: ${margin.top}${margin.top !== 'auto' ? 'px' : '' };` : ''}
    ${margin.right ? `margin-right: ${margin.right}${margin.right !== 'auto' ? 'px' : '' };` : ''}
    ${margin.bottom ? `margin-bottom: ${margin.bottom}${margin.bottom !== 'auto' ? 'px' : '' };` : ''}
    ${margin.left ? `margin-left: ${margin.left}${margin.left !== 'auto' ? 'px' : '' };` : ''}
  `;
};
const handlePadding = (props: StyleCommon) => {
  const padding: {
    top: number | 'auto' | null;
    right: number | 'auto' | null;
    bottom: number | 'auto' | null;
    left: number | 'auto' | null;
  } = {
    top: null,
    right: null,
    bottom: null,
    left: null
  };
  if (props.p) {
    if (typeof props.p === 'string') {
      padding.top = Style.space[props.p];
      padding.right = Style.space[props.p];
      padding.bottom = Style.space[props.p];
      padding.left = Style.space[props.p];
    } else {
      switch (props.p.length) {
        case 2:
          padding.top = Style.space[props.p[0]];
          padding.right = Style.space[props.p[1]];
          padding.bottom = Style.space[props.p[0]];
          padding.left = Style.space[props.p[1]];
          break;
        case 3:
          padding.top = Style.space[props.p[0]];
          padding.right = Style.space[props.p[1]];
          padding.bottom = Style.space[props.p[2]];
          padding.left = Style.space[props.p[1]];
          break;
        case 4:
          padding.top = Style.space[props.p[0]];
          padding.right = Style.space[props.p[1]];
          padding.bottom = Style.space[props.p[2]];
          padding.left = Style.space[props.p[3]];
          break;
      }
    }
  }
  if (props.px) {
    if (typeof props.px === 'string') {
      padding.right = Style.space[props.px];
      padding.left = Style.space[props.px];
    } else {
      padding.right = Style.space[props.px[0]];
      padding.left = Style.space[props.px[1]];
    }
  }
  if (props.py) {
    if (typeof props.py === 'string') {
      padding.top = Style.space[props.py];
      padding.bottom = Style.space[props.py];
    } else {
      padding.top = Style.space[props.py[0]];
      padding.bottom = Style.space[props.py[1]];
    }
  }
  if (props.pt) {
    padding.top = Style.space[props.pt];
  }
  if (props.pr) {
    padding.right = Style.space[props.pr];
  }
  if (props.pb) {
    padding.bottom = Style.space[props.pb];
  }
  if (props.pl) {
    padding.left = Style.space[props.pl];
  }
  return `
    ${padding.top ? `padding-top: ${padding.top}${padding.top !== 'auto' ? 'px' : '' };` : ''}
    ${padding.right ? `padding-right: ${padding.right}${padding.right !== 'auto' ? 'px' : '' };` : ''}
    ${padding.bottom ? `padding-bottom: ${padding.bottom}${padding.bottom !== 'auto' ? 'px' : '' };` : ''}
    ${padding.left ? `padding-left: ${padding.left}${padding.left !== 'auto' ? 'px' : '' };` : ''}
  `;
};
export const handleStyleCommon = (props: StyleCommon) => {
  return handleDisplay(props) + handleMargin(props) + handlePadding(props);
}
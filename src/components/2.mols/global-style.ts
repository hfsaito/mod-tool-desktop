import { Style } from '@components/1.atoms'
import { createGlobalStyle } from 'styled-components'

export const GlobalStyle = createGlobalStyle`
  html, body {
    min-height: 100%;
  }
  body {
    background-color: ${Style.color.body.background};
  }
`
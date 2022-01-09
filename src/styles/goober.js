import { createGlobalStyles } from 'goober/global'

// 1024px x .75 = 768px
// @custom-media --sm screen and (min-width: 34em);
// @custom-media --md screen and (min-width: 48em);
// @custom-media --lg screen and (min-width: 62em);
// @custom-media --xl screen and (min-width: 75em);

export const GlobalStyles = createGlobalStyles`
  :root {
    --sm: 34em;
    --lg: 48em;
    --lg: 62em;
    --xl: 75em;
    --max-width: 768px; 
    --color-white: #fafafa;
    --color-gray: #b3b3b3;
    --color-background: #1A202C;
    --color-miku: #00e1ee;
    --color-purple: #673ab8;
    --color-divider: #41464b;
  }

  html,
  body {
    background: var(--color-background);
    color: var(--color-white);
  }

  body {
    margin: 0;
  }

  * {
    box-sizing: border-box;
  }

  a {
    color: var(--color-miku);
    text-decoration: none;
  }
  a:hover {
    text-decoration: underline;
  }
`

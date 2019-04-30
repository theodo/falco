import { createMuiTheme } from '@material-ui/core/styles';

/**
 * App spacing measurement convention
 * Use the getSpacing function below to compute padding and margin
 */
const SPACING_UNIT = 5;
const MEASUREMENT_UNIT = 'px';

/**
 * Do not use directly the colorPalette in your components
 * Create an entry in the colorUsage below instead
 */
const colorPalette = {
  // New design
  primary500: '#3657FF',
  grey200: '#F7F8FA',
  grey300: '#E9EBED',
  grey500: '#979797',
  grey800: '#4A4A4A',
  accentBlue200: 'rgba(0,184,217,0.1)',
  accentBlue500: '#00B8D9',
  accentGreen200: 'rgba(54,179,126,0.1)',
  accentGreen500: '#36B37E',
  accentYellow500: '#F7B500',
  white: '#ffffff',

  // Former design
  blueNight: '#374894',
  blueNightDark: '#212934',
  blueNightLight: '#6175de',
  blueNightVeryLight: '#9ba3c9',
  error: '#d8000c',
  errorLight: '#ffd2d2',
  grey: '#6e7a8b',
  greyLight: '#e1e7eb',
  greyVeryLight: '#f8f9fa',
};

/**
 * Use this dictionnary in your components
 * Define a new key each time you use a colour if it's for a different use
 * Ex: fill, border-color, background-color, color ...
 */
export const colorUsage = {
  // New design
  h1Text: colorPalette.grey800,
  h2Text: colorPalette.grey800,
  h3Text: colorPalette.grey800,
  h4Text: colorPalette.grey800,
  introductionText: colorPalette.grey800,
  bodyText: colorPalette.grey800,
  link: colorPalette.primary500,
  logoText: colorPalette.grey800,
  menuLink: colorPalette.grey800,
  auditLink: colorPalette.grey800,
  badgeText: colorPalette.accentBlue500,
  badgeBackground: colorPalette.accentBlue200,
  quoteText: colorPalette.grey800,
  smallText: colorPalette.grey800,
  menuBackground: colorPalette.grey200,
  headerLogo: colorPalette.primary500,
  headerFakeBackground: colorPalette.white,
  loader: colorPalette.primary500,
  auditLinkBorder: colorPalette.grey300,
  auditLinkHoverText: colorPalette.primary500,
  auditLinkSelectedText: colorPalette.white,
  auditLinkSelectedBackground: colorPalette.primary500,
  auditLinkSelectedBorder: colorPalette.grey500,
  menuArrow: colorPalette.grey800,
  menuArrowSelected: colorPalette.white,

  // Former design
  primary: colorPalette.blueNight,
  auditResultContainer: colorPalette.blueNight,
  auditResultLink: colorPalette.blueNightLight,
  auditTitleText: colorPalette.white,
  auditTitleBackground: colorPalette.blueNightVeryLight,
  auditContainer: colorPalette.blueNightVeryLight,
  headerBackground: colorPalette.blueNight,
  headerText: colorPalette.greyVeryLight,
  popinErrorText: colorPalette.error,
  popinErrorBackground: colorPalette.errorLight,
  tileContainer: colorPalette.blueNightDark,
  tileButtonBackground: colorPalette.blueNightLight,
  tileButtonText: colorPalette.greyLight,
  tileLastAudit: colorPalette.grey,
  tilePageTitle: colorPalette.blueNightDark,
  tileTitle: colorPalette.blueNightLight,
};

export const fontFamily = {
  // New & former designs
  mainMono: `'IBM Plex Mono', monospace`,
  mainSans: `'IBM Plex Sans', sans-serif`,
};

export const fontSize = {
  // New design
  h1Text: '36px',
  h2Text: '30px',
  h3Text: '24px',
  h4Text: '20px',
  introductionText: '18px',
  bodyText: '14px',
  link: '14px',
  logoText: '26px',
  menuLink: '20px',
  auditLink: '20px',
  badgeText: '14px',
  quoteText: '24px',
  smallText: '10px',

  // Former design
  Xlarge: '24px',
  large: '20px',
  medium: '16px',
};

export const lineHeight = {
  // New design
  h1Text: '47px',
  h2Text: '39px',
  h3Text: '32px',
  h4Text: '27px',
  introductionText: '26px',
  bodyText: '20px',
  link: '20px',
  logoText: '34px',
  menuLink: '27px',
  auditLink: '27px',
  badgeText: '18px',
  quoteText: '34px',
  smallText: '15px',

  // Former design
  header: '70px',
};

export const fontWeight = {
  // New design
  h1Text: 'bold',
  h2Text: 'bold',
  h3Text: 'bold',
  h4Text: 'bold',
  logoText: 'bold',
  menuLink: 'bold',
  auditLink: 'bold',
  badgeText: 'bold',
};

export const fontStyle = {
  // New design
  quoteText: 'italic',
};

export const getSpacing = (multiplier: number): string =>
  `${multiplier * SPACING_UNIT}${MEASUREMENT_UNIT}`;

// Material UI - theme, do not declare constant inside this object
export const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: colorUsage.primary,
    },
  },
});

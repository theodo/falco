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
  blueNight: '#374894',
  blueNightDark: '#212934',
  blueNightLight: '#6175de',
  blueNightVeryLight: '#9ba3c9',
  error: '#d8000c',
  errorLight: '#ffd2d2',
  grey: '#6e7a8b',
  greyLight: '#e1e7eb',
  greyVeryLight: '#f8f9fa',
  white: '#ffffff',
};

/**
 * Use this dictionnary in your components
 * Define a new key each time you use a colour if it's for a different use
 * Ex: fill, border-color, background-color, color ...
 */
export const colorUsage = {
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
  mainMono: `'IBM Plex Mono', 'Helvetica', 'Arial', sans-serif`,
  mainSans: `'IBM Plex Sans', 'Helvetica', 'Arial', sans-serif`,
};

export const fontSize = {
  Xlarge: '24px',
  large: '20px',
  medium: '16px',
};

export const lineHeight = {
  header: '70px',
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

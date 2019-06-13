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
  primary500: '#3657FF',
  grey100: '#FAFAFA',
  grey200: '#F7F8FA',
  grey300: '#E9EBED',
  grey350: 'rgba(57, 63, 72, 0.3)',
  grey400: 'rgba(151, 151, 151, 0.80)',
  grey500: '#979797',
  grey800: '#4A4A4A',
  accentBlue200: 'rgba(0,184,217,0.1)',
  accentBlue500: '#00B8D9',
  accentGreen200: 'rgba(54,179,126,0.1)',
  accentGreen500: '#36B37E',
  accentYellow500: '#F7B500',
  white200: 'rgba(255,255,255,0.1)',
  white500: '#ffffff',
  lightGreen: '#3bafa3',
  black100: 'rgba(0, 0, 0, 0.2)',
  black200: 'rgba(0, 0, 0, 0.5)',
  red500: '#d8000c',
  red200: '#ffd2d2',
  transparent: 'rgba(0,0,0,0)',
};

/**
 * Use this dictionnary in your components
 * Define a new key each time you use a colour if it's for a different use
 * Ex: fill, border-color, background-color, color ...
 */
export const colorUsage = {
  // General
  h1Text: colorPalette.grey800,
  h2Text: colorPalette.grey800,
  h3Text: colorPalette.grey800,
  h4Text: colorPalette.grey800,
  introductionText: colorPalette.grey800,
  bodyText: colorPalette.grey800,
  labelText: colorPalette.grey800,
  quoteText: colorPalette.grey800,
  smallText: colorPalette.grey800,
  logoText: colorPalette.grey800,
  link: colorPalette.primary500,
  loader: colorPalette.primary500,
  defaultContentBackground: colorPalette.white500,
  popinErrorText: colorPalette.red500,
  popinErrorBackground: colorPalette.red200,
  cancelButtonText: colorPalette.primary500,
  cancelButtonBorder: colorPalette.primary500,
  cancelButtonBackground: colorPalette.transparent,
  validateButtonText: colorPalette.white500,
  validateButtonBackground: colorPalette.primary500,
  submitButtonText: colorPalette.white500,
  submitButtonBackground: colorPalette.primary500,
  checkboxBorder: colorPalette.grey500,
  checkboxColor: colorPalette.primary500,
  checkboxBackground: colorPalette.white500,
  inputText: colorPalette.grey800,
  inputTextPlaceholder: colorPalette.grey800,
  inputTextFocused: colorPalette.primary500,
  inputTextError: colorPalette.red500,
  inputTextLabel: colorPalette.grey800,
  inputTextBackground: colorPalette.transparent,
  inputSelectText: colorPalette.grey800,
  inputDisabledSelectText: colorPalette.grey500,
  inputSelectBorder: colorPalette.grey500,

  // Header
  headerLogo: colorPalette.primary500,
  headerFakeBackground: colorPalette.white500,
  headerShadowBox: colorPalette.grey350,
  headerButtonHoverText: colorPalette.primary500,
  accountMenuBackground: colorPalette.white500,
  accountMenuShadow: colorPalette.grey400,
  accountMenuText: colorPalette.grey800,
  accountMenuUserInfosBlockBorder: colorPalette.grey300,
  accountMenuActionItemHoverText: colorPalette.primary500,

  // Menu
  menuLink: colorPalette.grey800,
  menuBackground: colorPalette.grey200,
  menuArrow: colorPalette.grey800,
  menuArrowSelected: colorPalette.white500,
  menuLinkHover: colorPalette.primary500,

  // Landing Page
  landingPageGlobalBackground: colorPalette.grey100,
  landingTheodoLink: colorPalette.primary500,
  landingImageShadowBox: colorPalette.black100,
  leadFormBorder: colorPalette.grey800,
  leadSubmitButtonBackground: colorPalette.accentGreen500,
  leadSubmitButtonWaitingBackground: colorPalette.grey800,
  leadSubmitButtonLoaderPrimary: colorPalette.white500,
  leadSubmitButtonLoaderSecondary: colorPalette.transparent,
  leadSubmitButtonSuccessBackground: colorPalette.accentGreen500,
  leadSubmitButtonSuccessCheck: colorPalette.white500,

  // Login Page
  connectButtonWaitingBackground: colorPalette.grey800,
  connectButtonLoaderPrimary: colorPalette.white500,
  connectButtonLoaderSecondary: colorPalette.transparent,
  loginInputBorder: colorPalette.grey800,

  // Audit
  auditLink: colorPalette.grey800,
  auditLinkBorder: colorPalette.grey300,
  auditLinkHoverText: colorPalette.primary500,
  auditLinkSelectedText: colorPalette.white500,
  auditLinkSelectedBackground: colorPalette.primary500,
  auditLinkSelectedBorder: colorPalette.grey500,

  // Graphs
  graphBorder: colorPalette.grey800,
  graphLine: colorPalette.primary500,
  graphTooltipCursor: colorPalette.lightGreen,
  graphTooltipBackground: colorPalette.grey300,
  graphTooltipShadowBox: colorPalette.black200,
  graphTooltipActiveDot: colorPalette.lightGreen,
  graphTooltipActiveDotBorder: colorPalette.white500,
  graphText: colorPalette.grey800,
  graphModalToggleButton: colorPalette.grey800,

  // Metrics
  metricsSettingsText: colorPalette.primary500,
  metricInformationIcon: colorPalette.primary500,
  metricTooltipBackground: colorPalette.grey300,
  metricTooltipShadowBox: colorPalette.black200,
  metricTooltipText: colorPalette.grey800,
  metricsModalBackground: colorPalette.grey200,
  metricsModalShadow: colorPalette.grey400,

  // Projects
  projectsMenuBackground: colorPalette.white500,
  projectsMenuShadow: colorPalette.grey400,
  projectsMenuItemText: colorPalette.grey800,
  projectsMenuItemHoverText: colorPalette.primary500,
  projectsMenuItemBackground: colorPalette.grey200,
  projectsMenuItemBorder: colorPalette.grey500,
  projectsMenuItemSnapshotBorder: colorPalette.grey800,
  projectsMenuItemStar: colorPalette.accentYellow500,

  // WebPageTest
  webPageTestLinkButtonBackground: colorPalette.primary500,
  webPageTestLinkButtonText: colorPalette.white500,
  webPageTestRadioButtonBorder: colorPalette.grey500,
  webPageTestRadioButtonColor: colorPalette.primary500,
  webPageTestRadioButtonBackground: colorPalette.white500,

  // Badge
  pageBadgeText: colorPalette.accentBlue500,
  pageBadgeBackground: colorPalette.accentBlue200,
  pageBadgeSelectedText: colorPalette.white500,
  pageBadgeSelectedBackground: colorPalette.white200,
  scriptBadgeText: colorPalette.accentGreen500,
  scriptBadgeBackground: colorPalette.accentGreen200,
  scriptBadgeSelectedText: colorPalette.white500,
  scriptBadgeSelectedBackground: colorPalette.white200,
};

export const fontFamily = {
  mainMono: `'IBM Plex Mono', monospace`,
  mainSans: `'IBM Plex Sans', sans-serif`,
};

export const fontSize = {
  // General
  h1Text: '36px',
  h2Text: '30px',
  h3Text: '24px',
  h4Text: '20px',
  introductionText: '18px',
  labelText: '16px',
  bodyText: '14px',
  quoteText: '24px',
  smallText: '10px',
  logoText: '26px',
  link: '14px',
  submitButton: '14px',
  cancelButton: '14px',
  validateButton: '14px',
  inputText: '14px',
  inputTextPlaceholder: '14px',
  inputTextLabel: '12px',
  inputErrorMessage: '12px',
  inputSelectText: '14px',

  // Menu
  menuLink: '20px',

  // Landing
  leadSubmitErrorMessage: '13px',

  // Audit
  auditLink: '20px',

  // Graphs
  graphText: '14px',

  // Metrics
  metricTooltip: '12px',

  // WebPageTest
  webPageTestLink: '14px',

  // Badge
  badgeText: '14px',
};

export const lineHeight = {
  h1Text: '47px',
  h2Text: '39px',
  h3Text: '32px',
  h4Text: '27px',
  introductionText: '26px',
  bodyText: '20px',
  labelText: '20px',
  quoteText: '34px',
  smallText: '15px',
  link: '20px',
  logoText: '34px',
  submitButton: '18px',
  cancelButton: '18px',
  validateButton: '18px',
  inputText: '18px',
  inputTextPlaceholder: '16px',
  inputTextLabel: '16px',
  inputErrorMessage: '14px',
  inputSelectText: '18px',

  // Menu
  menuLink: '27px',

  // Audits
  auditLink: '27px',

  // Graphs
  graphText: '14px',

  // Metrics
  metricTooltip: '16px',

  // WebPageTest
  webPageTestLink: '18px',

  // Badge
  badgeText: '18px',
};

export const fontWeight = {
  h1Text: 'bold',
  h2Text: 'bold',
  h3Text: 'bold',
  h4Text: 'bold',
  labelText: '500',
  bodyText: '500',
  logoText: 'bold',
  linkText: 'bold',
  submitButton: 'bold',
  cancelButton: 'bold',
  validateButton: 'bold',
  inputErrorMessage: 'bold' as 'bold',
  inputTextLabel: 'bold',

  // Header
  accountMenuActionItemHoverText: 'bold',

  // Menu
  menuLink: 'bold',

  // Landing
  landingTheodoLink: 'bold',

  // Audits
  auditLink: 'bold',

  // Graphs
  graphText: 'bold',

  // Metrics
  metricTooltip: '500',

  // WebPageTest
  webPageTestLink: 'bold',

  // Badge
  badgeText: 'bold',
};

export const fontStyle = {
  quoteText: 'italic',
  lighthouseNote: 'italic',
  inputErrorMessage: 'italic',
};

export const getSpacing = (multiplier: number): string =>
  `${multiplier * SPACING_UNIT}${MEASUREMENT_UNIT}`;

export const responsiveThreshold = '1240px';

// Material UI - theme, do not declare constant inside this object
export const muiTheme = createMuiTheme({
  typography: {
    useNextVariants: true,
  },
  palette: {
    primary: {
      main: colorPalette.primary500,
    },
  },
});

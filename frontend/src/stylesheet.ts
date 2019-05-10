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
};

/**
 * Use this dictionnary in your components
 * Define a new key each time you use a colour if it's for a different use
 * Ex: fill, border-color, background-color, color ...
 */
export const colorUsage = {
  h1Text: colorPalette.grey800,
  h2Text: colorPalette.grey800,
  h3Text: colorPalette.grey800,
  h4Text: colorPalette.grey800,
  introductionText: colorPalette.grey800,
  bodyText: colorPalette.grey800,
  labelText: colorPalette.grey800,
  link: colorPalette.primary500,
  logoText: colorPalette.grey800,
  menuLink: colorPalette.grey800,
  auditLink: colorPalette.grey800,
  pageBadgeText: colorPalette.accentBlue500,
  pageBadgeBackground: colorPalette.accentBlue200,
  pageBadgeSelectedText: colorPalette.white500,
  pageBadgeSelectedBackground: colorPalette.white200,
  scriptBadgeText: colorPalette.accentGreen500,
  scriptBadgeBackground: colorPalette.accentGreen200,
  scriptBadgeSelectedText: colorPalette.white500,
  scriptBadgeSelectedBackground: colorPalette.white200,
  quoteText: colorPalette.grey800,
  smallText: colorPalette.grey800,
  menuBackground: colorPalette.grey200,
  headerLogo: colorPalette.primary500,
  headerFakeBackground: colorPalette.white500,
  loader: colorPalette.primary500,
  auditLinkBorder: colorPalette.grey300,
  auditLinkHoverText: colorPalette.primary500,
  auditLinkSelectedText: colorPalette.white500,
  auditLinkSelectedBackground: colorPalette.primary500,
  auditLinkSelectedBorder: colorPalette.grey500,
  menuArrow: colorPalette.grey800,
  menuArrowSelected: colorPalette.white500,
  graphBorder: colorPalette.grey800,
  graphLine: colorPalette.primary500,
  graphTooltipCursor: colorPalette.lightGreen,
  graphTooltipBackground: colorPalette.grey300,
  graphTooltipShadowBox: colorPalette.black200,
  graphTooltipActiveDot: colorPalette.lightGreen,
  graphTooltipActiveDotBorder: colorPalette.white500,
  graphText: colorPalette.grey800,
  projectsMenuBackground: colorPalette.white500,
  projectsMenuShadow: colorPalette.grey400,
  projectsMenuItemText: colorPalette.grey800,
  projectsMenuItemHoverText: colorPalette.primary500,
  projectsMenuItemBackground: colorPalette.grey200,
  projectsMenuItemBorder: colorPalette.grey500,
  projectsMenuItemSnapshotBorder: colorPalette.grey800,
  projectsMenuItemStar: colorPalette.accentYellow500,
  headerButtonHoverText: colorPalette.primary500,
  webPageTestLinkButtonBackground: colorPalette.primary500,
  webPageTestLinkButtonText: colorPalette.white500,
  webPageTestRadioButtonBorder: colorPalette.grey500,
  webPageTestRadioButtonColor: colorPalette.primary500,
  webPageTestRadioButtonBackground: colorPalette.white500,
  scriptStepSelectLabelText: colorPalette.grey800,
  inputSelectText: colorPalette.grey800,
  inputDisabledSelectText: colorPalette.grey500,
  inputSelectBorder: colorPalette.grey500,
  accountMenuBackground: colorPalette.white500,
  accountMenuShadow: colorPalette.grey400,
  accountMenuText: colorPalette.grey800,
  accountMenuUserInfosBlockBorder: colorPalette.grey300,
  accountMenuActionItemHoverText: colorPalette.primary500,
  popinErrorText: colorPalette.red500,
  popinErrorBackground: colorPalette.red200,
  pickRightMetricsLinkText: colorPalette.primary500,
  menuLinkHover: colorPalette.primary500,
  defaultContentBackground: colorPalette.white500,
  landingPageGlobalBackground: colorPalette.grey100,
  landingImageShadowBox: colorPalette.black100,
  metricInformationIcon: colorPalette.primary500,
  metricInformationTooltipBackground: colorPalette.grey300,
  metricInformationTooltipShadowBox: colorPalette.black200,
  metricInformationTooltipText: colorPalette.grey800,
};

export const fontFamily = {
  mainMono: `'IBM Plex Mono', monospace`,
  mainSans: `'IBM Plex Sans', sans-serif`,
};

export const fontSize = {
  h1Text: '36px',
  h2Text: '30px',
  h3Text: '24px',
  h4Text: '20px',
  introductionText: '18px',
  labelText: '16px',
  bodyText: '14px',
  link: '14px',
  webPageTestLink: '14px',
  logoText: '26px',
  menuLink: '20px',
  auditLink: '20px',
  badgeText: '14px',
  quoteText: '24px',
  smallText: '10px',
  graphText: '14px',
  scriptStepSelectLabelText: '16px',
  inputSelectText: '14px',
  metricInformationTooltip: '12px',
};

export const lineHeight = {
  h1Text: '47px',
  h2Text: '39px',
  h3Text: '32px',
  h4Text: '27px',
  introductionText: '26px',
  bodyText: '20px',
  labelText: '20px',
  link: '20px',
  logoText: '34px',
  menuLink: '27px',
  auditLink: '27px',
  badgeText: '18px',
  quoteText: '34px',
  smallText: '15px',
  graphText: '20px',
  webPageTestLink: '18px',
  scriptStepSelectLabelText: '20px',
  inputSelectText: '18px',
  metricInformationTooltip: '16px',
};

export const fontWeight = {
  h1Text: 'bold',
  h2Text: 'bold',
  h3Text: 'bold',
  h4Text: 'bold',
  labelText: '500',
  bodyText: '500',
  logoText: 'bold',
  menuLink: 'bold',
  auditLink: 'bold',
  badgeText: 'bold',
  graphText: 'bold',
  linkText: 'bold',
  webPageTestLink: 'bold',
  scriptStepSelectLabelText: '500',
  accountMenuActionItemHoverText: 'bold',
  metricInformationTooltip: '500',
};

export const fontStyle = {
  quoteText: 'italic',
  lighthouseNote: 'italic',
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
      main: colorPalette.primary500,
    },
  },
});

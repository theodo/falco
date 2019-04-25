module.exports = {
  plugins: ['stylelint-declaration-strict-value'],
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-styled-components',
  ],
  rules: {
    'declaration-no-important': true,
    'selector-max-specificity': '0,2,0',
    'scale-unlimited/declaration-strict-value': [
      ['border-color', 'color', 'background-color', 'font-size', 'line-height', 'font-family'],
    ],
    'selector-max-type': 0,
  },
};

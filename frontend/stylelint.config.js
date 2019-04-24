module.exports = {
  processors: ['stylelint-processor-styled-components'],
  extends: [
    'stylelint-config-standard',
    'stylelint-config-prettier',
    'stylelint-config-styled-components',
  ],
  rules: {
    'declaration-no-important': true,
    'selector-max-specificity': '0,2,0',
    'selector-max-type': 0,
  },
};

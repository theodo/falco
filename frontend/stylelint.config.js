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
      [
        'font-size',
        'line-height',
        'color',
        'background-color',
        'border-color',
        'border-top-color',
        'border-right-color',
        'border-bottom-color',
        'border-left-color',
        'fill',
      ],
      {
        ignoreKeywords: ['transparent', 'inherit', 'initial', 'unset', 'none', 'currentColor'],
      },
    ],
    'selector-max-type': 0,
  },
};

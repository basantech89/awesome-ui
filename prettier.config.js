const base = require('eslint-config-storybook/prettier.config')

module.exports = {
  ...base,
  arrowParens: 'avoid',
  overrides: [
    {
      files: '*.html',
      options: { parser: 'babel' }
    }
  ]
}

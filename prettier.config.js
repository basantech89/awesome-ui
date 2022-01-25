const base = require('@awesome-tools/eslint-config/prettier.config')

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

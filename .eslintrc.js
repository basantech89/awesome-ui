// const error = 2;
// const warn = 1;
// const ignore = 0

module.exports = {
  root: true,
  extends: ['@awesome-tools/eslint-config', 'plugin:storybook/recommended'],
  overrides: [{
    files: ['**/*.tsx', '**/*.ts'],
    rules: {
      'react/prop-types': 'off',
      // note you must disable the base rule as it can report incorrect errors
      'no-use-before-define': 'off',
      '@typescript-eslint/no-use-before-define': ['error'],
      '@typescript-eslint/no-unused-vars': 'error',
      'no-unused-vars': 0,
      '@typescript-eslint/no-unused-vars-experimental': 'off',
      // note you must disable the base rule as it can report incorrect errors
      'no-redeclare': 'off',
      '@typescript-eslint/no-redeclare': ['error']
    }
  }],
  env: {
    browser: true,
    jest: true
  }
};
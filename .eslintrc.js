// const error = 2;
// const warn = 1;
// const ignore = 0

module.exports = {
  root: true,
  extends: ['@awesome-tools/eslint-config'],
  overrides: [
    {
      files: ['**/*.tsx'],
      rules: {
        'react/prop-types': 'off',
        // note you must disable the base rule as it can report incorrect errors
        'no-use-before-define': 'off',
        '@typescript-eslint/no-use-before-define': ['error'],
        '@typescript-eslint/no-unused-vars': 'off',
        'no-unused-vars': 0,
        '@typescript-eslint/no-unused-vars-experimental': 'error'
      }
    }
  ],
  env: {
		browser: true
	}
}

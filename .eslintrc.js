module.exports = {
  extends: ['plugin:prettier/recommended'],
  ignorePatterns: ['build', 'dist', 'lib', 'node_modules'],
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint'],
  rules: {
    'prettier/prettier': [
      'error',
      {
        semi: true,
        trailingComma: 'all',
        tabWidth: 2,
        bracketSpacing: true,
        parser: 'typescript',
        arrowParens: 'always',
        useTabs: false,
        jsxSingleQuote: true,
        singleQuote: true,
        endOfLine: 'lf',
        printWidth: 140,
      },
    ],
  },
};

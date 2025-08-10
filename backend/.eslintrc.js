module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  parserOptions: {
    project: ['tsconfig.json'],
    tsconfigRootDir: __dirname, 
    sourceType: 'module',
  },
  plugins: ['@typescript-eslint', 'simple-import-sort', 'import', 'prettier'],
  extends: [
    'plugin:@typescript-eslint/recommended',
    'plugin:import/typescript',
    'prettier',
  ],
  env: {
    node: true,
    jest: true,
  },
  settings: {
    'import/resolver': {
      typescript: {
        project: ['tsconfig.json'],
      },
    },
  },
  ignorePatterns: ['.eslintrc.js', 'dist', 'node_modules'],
  rules: {
    '@typescript-eslint/interface-name-prefix': 'off',
    '@typescript-eslint/explicit-function-return-type': 'off',
    '@typescript-eslint/explicit-module-boundary-types': 'off',
    '@typescript-eslint/no-explicit-any': 'off',
    'simple-import-sort/imports': 'error',
    'simple-import-sort/exports': 'error',
    'prettier/prettier': 'error',
  },
};


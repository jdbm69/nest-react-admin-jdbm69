/*
Cambios en configuración ESLint:

- Se agregó 'tsconfigRootDir: __dirname' en parserOptions para mejor resolución.
- Se agregó el plugin 'import' y 'prettier' junto con sus configuraciones.
- Se incluyó la extensión 'plugin:import/typescript' y reemplazó 'prettier/@typescript-eslint' por 'prettier'.
- Se añadieron settings para 'import/resolver' con TypeScript y tsconfig.
- Se extendió ignorePatterns para incluir 'dist' y 'node_modules'.
- Se agregó regla 'prettier/prettier': 'error' para forzar formato prettier.
*/

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


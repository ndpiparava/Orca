module.exports = {
  parser: '@typescript-eslint/parser',
  extends: [
    'universe',
    'universe/shared/typescript-analysis',
    'plugin:react-hooks/recommended',
    'prettier',
    'plugin:prettier/recommended',
    'plugin:import/recommended',
    'plugin:import/typescript',
  ],
  overrides: [
    {
      parserOptions: {
        project: './tsconfig.json',
      },
      files: ['*.ts', '*.tsx', '*.d.ts', '*.mock.ts'],
    },
  ],
  //plugins: ['@typescript-eslint'],
  plugins: ['react', 'react-hooks', 'prettier'],
  settings: {
    'import/resolver': {
      typescript: {}, // this loads <rootdir>/tsconfig.json to ESLint
    },
    'import/ignore': ['node_modules'],
  },
  ignorePatterns: [
    'react-native.config.js',
    'babel.config.js',
    'metro.config.js',
    'jest.config.js',
    'node_modules/',
    '.yarn/', // Ensure this is here
    'scripts/',
    'coverage/',
  ],
  rules: {
    'import/order': ['error'],
  },
};

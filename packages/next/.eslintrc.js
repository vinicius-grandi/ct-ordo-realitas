module.exports = {
  root: true,
  parser: '@typescript-eslint/parser',
  plugins: ['@typescript-eslint', 'testing-library', 'jest-dom'],
  overrides: [
    {
      files: ['**/__tests__/**/*.[jt]s?(x)', '**/?(*.)+(spec|test).[jt]s?(x)'],
      extends: ['plugin:testing-library/react'],
      env: {
        jest: true,
      },
    },
  ],
  extends: [
    'next/core-web-vitals',
    'plugin:@typescript-eslint/recommended',
    'prettier',
    'plugin:react/recommended',
    'plugin:import/errors',
    'plugin:import/typescript',
    'plugin:import/warnings',
    'plugin:jsx-a11y/recommended',
    'plugin:react-hooks/recommended',
    'airbnb',
    'airbnb-typescript',
    'plugin:jest-dom/recommended',
  ],
  env: {
    browser: true,
    es2021: true,
    node: true,
  },
  parserOptions: {
    project: ['./tsconfig.json'],
    ecmaVersion: 6,
    sourceType: 'module',
    ecmaFeatures: {
      jsx: true,
    },
  },
  settings: {
    react: {
      version: 'detect',
    },
    'import/resolver': {
      node: {
        moduleDirectory: ['node_modules', './'],
        extensions: ['.js', '.tsx', '.jsx', '.ts'],
      },
    },
  },
  rules: {
    '@typescript-eslint/no-unused-vars': 'error',
    '@typescript-eslint/no-explicit-any': 'off',
    'react/react-in-jsx-scope': 'off',
    'react/function-component-definition': 'off',
    '@typescript-eslint/no-floating-promises': ['error'],
    'no-void': 'off',
    'operator-linebreak': 'off',
    'jsx-a11y/anchor-is-valid': 'off',
  },
  ignorePatterns: ['**/*.js'],
};

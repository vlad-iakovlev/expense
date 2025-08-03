import { FlatCompat } from '@eslint/eslintrc'

const compat = new FlatCompat({
  baseDirectory: import.meta.dirname,
})

const eslintConfig = [
  ...compat.config({
    extends: ['next/core-web-vitals', 'next/typescript', 'prettier'],
  }),
  {
    ignores: [
      'node_modules/',
      '.next/',
      'out/',
      'next-env.d.ts',
      'public/sw.js',
      'public/sw.js.map',
      'prettier.config.mjs',
      'eslint.config.mjs',
      'next.config.js',
      'postcss.config.js',
    ],
  },
  {
    languageOptions: {
      parserOptions: {
        project: './tsconfig.json',
      },
    },
  },
  {
    rules: {
      '@typescript-eslint/no-extraneous-class': 'off',
      '@typescript-eslint/no-unnecessary-condition': 'error',
      'arrow-body-style': ['error', 'as-needed'],
    },
  },
]

export default eslintConfig

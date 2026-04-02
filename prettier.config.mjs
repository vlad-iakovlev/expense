/** @type {import("prettier").Config} */
const prettierConfig = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-packagejson',
  ],
  semi: false,
  singleQuote: true,
  importOrder: ['^@expense/', '^@/', '^\\.\\./', '^\\./'],
  importOrderSortSpecifiers: true,
  tailwindStylesheet: './packages/client/src/styles/globals.css',
}

export default prettierConfig

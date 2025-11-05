/** @type {import("prettier").Config} */
const prettierConfig = {
  plugins: [
    '@trivago/prettier-plugin-sort-imports',
    'prettier-plugin-tailwindcss',
    'prettier-plugin-packagejson',
  ],
  semi: false,
  singleQuote: true,
  importOrder: ['^@/', '^\\.\\./', '^\\./'],
  importOrderSortSpecifiers: true,
  tailwindStylesheet: './styles/globals.css',
}

export default prettierConfig

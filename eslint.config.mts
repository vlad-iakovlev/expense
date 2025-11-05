import eslintConfig from '@vlad-iakovlev/eslint-config'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig(
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'next-env.d.ts',
    'public/sw.js',
    'public/sw.js.map',
    'prettier.config.mjs',
    'next.config.mjs',
    'postcss.config.js',
  ]),
  eslintConfig.next,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)

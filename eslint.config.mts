import eslintConfig from '@vlad-iakovlev/eslint-config'
import { defineConfig, globalIgnores } from 'eslint/config'

export default defineConfig(
  globalIgnores([
    '.next/**',
    'out/**',
    'build/**',
    'generated/**',
    'packages/client/dist/**',
    'packages/client/generated/**',
    'packages/server/generated/**',
    'next-env.d.ts',
    'public/sw.js',
    'public/sw.js.map',
    'prettier.config.mjs',
    'next.config.mjs',
    'postcss.config.js',
  ]),
  eslintConfig.react,
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)

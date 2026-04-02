import eslintConfig from '@vlad-iakovlev/eslint-config'
import { Config, defineConfig, globalIgnores } from 'eslint/config'

const scope = (configs: Config[], files: string[]) =>
  configs.map((config) => ({ ...config, files }))

export default defineConfig(
  globalIgnores([
    'packages/*/dist/**',
    'packages/*/generated/**',
    'packages/client/public/sw*',
    'packages/client/public/swe-worker*',
    'prettier.config.mjs',
  ]),
  ...scope(eslintConfig.react, ['packages/client/**/*.{js,ts,mts,tsx}']),
  ...scope(eslintConfig.node, [
    'packages/server/**/*.{js,ts}',
    'packages/generators/**/*.{js,ts}',
    'packages/prisma/**/*.{js,ts}',
    'packages/schemas/**/*.{js,ts}',
  ]),
  {
    languageOptions: {
      parserOptions: {
        projectService: true,
        tsconfigRootDir: import.meta.dirname,
      },
    },
  },
)

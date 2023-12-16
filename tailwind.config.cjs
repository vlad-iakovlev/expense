// @ts-check

const defaultTheme = require('tailwindcss/defaultTheme')
const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      sm: '448px',
      md: '768px',
      lg: '1136px',
      xl: '1504px',
      '2xl': '1872px',
    },
    extend: {
      boxShadow: {
        dnd: '0 5px 15px rgb(0 0 0 / 0.25)',
      },
      minHeight: ({ theme }) => ({ ...theme('spacing') }),
      maxHeight: ({ theme }) => ({ ...theme('spacing') }),
      minWidth: ({ theme }) => ({ ...theme('spacing') }),
      maxWidth: ({ theme }) => ({ ...theme('spacing') }),
    },
  },
  safelist: [
    // Avatars
    'bg-red-700',
    'bg-orange-700',
    'bg-amber-700',
    'bg-yellow-700',
    'bg-lime-700',
    'bg-green-700',
    'bg-emerald-700',
    'bg-teal-700',
    'bg-cyan-700',
    'bg-sky-700',
    'bg-blue-700',
    'bg-indigo-700',
    'bg-violet-700',
    'bg-purple-700',
    'bg-fuchsia-700',
    'bg-pink-700',
    'bg-rose-700',
  ],

  plugins: [
    plugin(({ addComponents }) => {
      addComponents({
        '.text-primary': {
          '@apply text-black dark:text-zinc-100': {},
        },
        '.text-secondary': {
          '@apply text-zinc-900 dark:text-zinc-200': {},
        },
        '.text-tertiary': {
          '@apply text-zinc-600 dark:text-zinc-400': {},
        },

        '.bg-primary': {
          '@apply bg-zinc-300 dark:bg-zinc-900': {},
        },
        '.bg-secondary': {
          '@apply bg-white dark:bg-zinc-800': {},
        },
        '.bg-tertiary': {
          '@apply bg-zinc-100 dark:bg-zinc-700': {},
        },
        '.bg-quaternary': {
          '@apply bg-zinc-200 dark:bg-zinc-600': {},
        },
        '.bg-quinary': {
          '@apply bg-zinc-300 dark:bg-zinc-500': {},
        },
      })
    }),
  ],
}

// @ts-check

const plugin = require('tailwindcss/plugin')

/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ['./pages/**/*', './components/**/*', './cards/**/*'],
  future: {
    hoverOnlyWhenSupported: true,
  },
  theme: {
    screens: {
      sm: '28rem',
      md: '48rem',
      lg: '71rem',
      xl: '94rem',
      '2xl': '117rem',
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
    'bg-red-800',
    'bg-orange-800',
    'bg-amber-800',
    'bg-yellow-800',
    'bg-lime-800',
    'bg-green-800',
    'bg-emerald-800',
    'bg-teal-800',
    'bg-cyan-800',
    'bg-sky-800',
    'bg-blue-800',
    'bg-indigo-800',
    'bg-violet-800',
    'bg-purple-800',
    'bg-fuchsia-800',
    'bg-pink-800',
    'bg-rose-800',
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
          '@apply text-zinc-600 dark:text-zinc-300': {},
        },
        '.text-quaternary': {
          '@apply text-zinc-500 dark:text-zinc-400': {},
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

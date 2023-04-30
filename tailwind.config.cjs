const defaultTheme = require('tailwindcss/defaultTheme')

module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
      minHeight: ({ theme }) => ({ ...theme('spacing') }),
      minWidth: ({ theme }) => ({ ...theme('spacing') }),
      spacing: {
        15: `${15 * 0.25}rem`,
      },
    },
  },
  safelist: [
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
}

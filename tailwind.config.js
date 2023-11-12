/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    './src/views/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
    fontFamily: {
      'black-ops-one': ['"Black Ops One"', 'cursive'],
      'mulish': ['Mulish', 'sans-serif'],
    },
    extend: {},
  },
  plugins: [],
}

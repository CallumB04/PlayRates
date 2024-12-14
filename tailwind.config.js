export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        ssp: ['Source Sans Pro', 'sans-serif'],
      },
      transitionProperty: {
        height: 'height',
        width: 'width',
      },
    },
  },
  plugins: [],
}
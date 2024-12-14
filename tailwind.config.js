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
      colors: {
        navbarColor: "#232323",
        dropdownColor: "#333333",
        textColor: "#f3f4f6",
        highlightPurple: "#9333ea",
      }
    },
  },
  plugins: [],
}
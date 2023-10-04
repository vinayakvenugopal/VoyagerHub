/** @type {import('tailwindcss').Config} */

export default ({
  content: [
    "./index.html",
    "./src/screens/userScreens/RegisterScreen.tsx",
  ],
  theme: {
    extend: {},
  },
  plugins: [require('@tailwindcss/forms'), 
],
})


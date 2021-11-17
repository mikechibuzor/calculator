// tailwind.config.js
module.exports = {
  mode: "jit",
  purge: ["./index.html", "./src/**/*.{vue,js,ts,jsx,tsx}"],
  darkMode: false, // or 'media' or 'class'
  theme: {
    extend: {},
  },
  variants: {
    extend: {
      colors: {
        "main-background": " hsl(222, 26%, 31%)",
        "toggle-background": "hsl(223, 31%, 20%)",
        "screen-background": "hsl(224, 36%, 15%)",
      },
    },
  },
  plugins: [],
};

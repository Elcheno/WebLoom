/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: "#f1f5f9",
        foreground: "hsl(var(--foreground))",
        btn: {
          background: "hsl(var(--btn-background))",
          "background-hover": "hsl(var(--btn-background-hover))",
        },
        'black-primary': "#000000",
        'white-primary': "#ffffff",
      },
      rounded: {
        card: "2rem"
      },
      screens: {
        '3xl': '1921px'
      },
      animation: {
        "zoom-in-fast": "zoom-in 0.1s ease-out",
        "scale-pulse": "pulse-bounce 0.25s ease-in-out"
      },
      keyframes: {
        "zoom-in": {
          "0%": {
            "opacity": "0",
            "transform": "scale(.5)"
          },
          "100%": {
            "opacity": "1",
            "transform": "scale(1)"
          }
        },
        "pulse-bounce": {
          "0%": {
            "transform": "scale(1)"
          },
          "50%": {
            "transform": "scale(1.3)"
          },
          "100%": {
            "transform": "scale(1)"
          }
        }
      }
    },
  },
  plugins: [],
};

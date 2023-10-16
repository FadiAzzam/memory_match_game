/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx}"],
  theme: {
    container: {
      center: true,
      padding: {
        DEFAULT: "1rem",
        sm: "2rem",
        lg: "4rem",
        xl: "5rem",
        "2xl": "6rem",
      },
    },
    extend: {
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-3deg)" },
          "50%": { transform: "rotate(3deg)" },
        },
        rotate: {
          "100%": {
            transform: "rotate(360deg)",
          },
        },
      },
      animation: {
        "spin-slow": "spin 3s linear infinite",
        wiggle: "wiggle 1s ease-in-out infinite",
        outTop: "rotate 20s linear infinite",
        inTop: "rotate 10s linear infinite",
        outBottom: "rotate 25s linear infinite",
        inBottom: "rotate 15s linear infinite",
      },
      fontFamily: {
        VT323: ["VT323", "monospace"],
        P: ['"Press Start 2P"', "monospace"],
        Audiowide: ["Audiowide", "monospace"],
      },
    },
  },
  plugins: [],
};

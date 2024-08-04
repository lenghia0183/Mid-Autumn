/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{js,jsx,ts,tsx,html}"],
  theme: {
    extend: {
      maxWidth: {
        "1/4": "25%",
        "1/2": "50%",
        "3/4": "75%",
        "4/5": "80%",
      },
      animation: {
        "progress-spin": "progress-spin 1.5s linear infinite",
      },
      keyframes: {
        "progress-spin": {
          "0%": {
            transform: "rotate(0deg)",
            strokeDasharray: "1, 200",
            strokeDashoffset: "0",
          },
          "50%": {
            transform: "rotate(180deg)",
            strokeDasharray: "100, 200",
            strokeDashoffset: "-15px",
          },
          "100%": {
            transform: "rotate(360deg)",
            strokeDasharray: "100, 200",
            strokeDashoffset: "-125px",
          },
        },
      },
    },
  },
  plugins: [],
};

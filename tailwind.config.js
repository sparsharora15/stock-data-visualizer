/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./src/**/*.{html,js,jsx,ts,tsx}"],
  theme: {
    extend: {
      padding: {
        "1": "1rem",
        '5': "5rem",
        '2': "2rem",
      },
      width: {
        "9": "9rem"
      },
      boxShadow: {
        'custom': '6px 0px 18px 0px #00000008',
      },
      backgroundColor: {
        'primary': "#FBFBFB"
      },
      colors:{
        "success":"#00fc00"
      },
      borderRadius: {
        "1": "8px"
      },
      maxHeight: {
        "50": '50vh'
      }
    },
  },
  plugins: [],
}

export default {
  content: [
    "./index.html",
    "./src/**/*.{js,jsx,ts,tsx}",
  ],

  theme: {
    screens: {
      sm: '480px',
      md: '768px',
      lg: '976px',
      xl: '1440px',
    },
    colors: {
      'primary': '#373741',
      'secondary': '#816A7C',
      'white': '#FFFFFF',
    },

    fontFamily: {
      sans: ['Gantari', 'Arial', 'sans-serif'],
    },
    extend: {
      spacing: {
        '128': '32rem',
        '144': '36rem',
      },
      borderRadius: {
        '4xl': '2rem',
      },
      textMain: {
        default: '#373741',
      },
    },
  },
  variants: {
    extend: {
      transform: ['responsive', 'hover', 'focus'],
    },
  },
  plugins: [],
}

/** @type {import('tailwindcss').Config} */
export default {
  darkMode: ['class', '[data-mode="dark"]'],
  content: ['./index.html', './src/**/*.{ts,tsx,js,jsx}'],
  theme: {
    extend: {
      fontFamily: {
        lato: ['Poppins', 'sans-serif'],
      },
      colors: {
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          foreground: '#d3f3df',
          100: '#d3f3df',
          200: '#a7e8bf',
          300: '#7adc9e',
          400: '#4ed17e',
          DEFAULT: '#22c55e',
          600: '#1b9e4b',
          700: '#147638',
          800: '#0e4f26',
          900: '#072713',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        sidebar: {
          DEFAULT: '#171717',
          foreground: '#fff',
          primary: '#262626',
          'primary-foreground': '#fafafa',
          accent: '#262626',
          'accent-foreground': '#fff',
          border: '#262626',
          ring: '#fafafa',
        },
      },
    },
  },
  plugins: [require('tailwindcss-animate')],
};

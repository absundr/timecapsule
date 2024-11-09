import type { Config } from 'tailwindcss';
import { fontFamily } from 'tailwindcss/defaultTheme';

const config: Config = {
  darkMode: ['class'],
  content: ['./src/**/*.{html,js,svelte,ts}'],
  safelist: ['dark'],
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
        '3xl': '1600px',
        '4xl': '1800px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border) / <alpha-value>)',
        input: 'hsl(var(--input) / <alpha-value>)',
        ring: 'hsl(var(--ring) / <alpha-value>)',
        background: 'hsl(var(--background) / <alpha-value>)',
        foreground: 'hsl(var(--foreground) / <alpha-value>)',
        primary: {
          DEFAULT: 'hsl(var(--primary) / <alpha-value>)',
          foreground: 'hsl(var(--primary-foreground) / <alpha-value>)',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary) / <alpha-value>)',
          foreground: 'hsl(var(--secondary-foreground) / <alpha-value>)',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive) / <alpha-value>)',
          foreground: 'hsl(var(--destructive-foreground) / <alpha-value>)',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted) / <alpha-value>)',
          foreground: 'hsl(var(--muted-foreground) / <alpha-value>)',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent) / <alpha-value>)',
          foreground: 'hsl(var(--accent-foreground) / <alpha-value>)',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover) / <alpha-value>)',
          foreground: 'hsl(var(--popover-foreground) / <alpha-value>)',
        },
        card: {
          DEFAULT: 'hsl(var(--card) / <alpha-value>)',
          foreground: 'hsl(var(--card-foreground) / <alpha-value>)',
        },
        cadet_gray: {
          DEFAULT: '#9aadbf',
          100: '#1b232a',
          200: '#364655',
          300: '#51697f',
          400: '#718ca4',
          500: '#9aadbf',
          600: '#afbecc',
          700: '#c3ced9',
          800: '#d7dfe6',
          900: '#ebeff2',
        },
        air_superiority_blue: {
          DEFAULT: '#6d98ba',
          100: '#131f28',
          200: '#263e50',
          300: '#395d79',
          400: '#4c7ca1',
          500: '#6d98ba',
          600: '#8aadc8',
          700: '#a8c2d6',
          800: '#c5d6e4',
          900: '#e2ebf1',
        },
        tan: {
          DEFAULT: '#d3b99f',
          100: '#332517',
          200: '#664a2f',
          300: '#997046',
          400: '#bc956e',
          500: '#d3b99f',
          600: '#dcc8b4',
          700: '#e5d6c6',
          800: '#eee3d9',
          900: '#f6f1ec',
        },
        old_rose: {
          DEFAULT: '#c17767',
          100: '#2a1611',
          200: '#542b22',
          300: '#7e4133',
          400: '#a85745',
          500: '#c17767',
          600: '#cd9385',
          700: '#daaea4',
          800: '#e6c9c2',
          900: '#f3e4e1',
        },
        licorice: {
          DEFAULT: '#210203',
          100: '#070001',
          200: '#0d0101',
          300: '#140102',
          400: '#1b0202',
          500: '#210203',
          600: '#7b070b',
          700: '#d50c13',
          800: '#f54c51',
          900: '#faa5a8',
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      fontFamily: {
        sans: [...fontFamily.sans],
      },
    },
  },
};

export default config;

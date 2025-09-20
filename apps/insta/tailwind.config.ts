import type { Config } from 'tailwindcss';

const config = {
  darkMode: ['class'],
  content: ['./src/**/*.{ts,tsx}'],
  prefix: '',
  theme: {
    container: {
      center: true,
      padding: '2rem',
      screens: {
        '2xl': '1400px',
      },
    },
    extend: {
      colors: {
        border: 'hsl(var(--border))',
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        background: 'hsl(var(--background))',
        foreground: 'hsl(var(--foreground))',
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        // Instagram Brand Colors
        insta: {
          primary: '#0095F6',      // Primary action buttons, links
          'gradient-start': '#833AB4',  // Brand gradient start
          'gradient-mid': '#FD1D1D',    // Brand gradient middle
          'gradient-end': '#FCAF45',    // Brand gradient end
          secondary: '#262626',    // Body text
          'neutral-light': '#FAFAFA',   // Background, card containers
          'neutral-mid': '#DBDBDB',     // Dividers, borders
          'neutral-dark': '#000000',    // Header text, icons
          accent: '#ED4956',       // Like, notification emphasis
          success: '#27AE60',      // Success/completion feedback
          warning: '#F2C94C',      // Warning UI
          error: '#EB5757',        // Error messages
        },
      },
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },
      keyframes: {
        'accordion-down': {
          from: { height: '0' },
          to: { height: 'var(--radix-accordion-content-height)' },
        },
        'accordion-up': {
          from: { height: 'var(--radix-accordion-content-height)' },
          to: { height: '0' },
        },
      },
      animation: {
        'accordion-down': 'accordion-down 0.2s ease-out',
        'accordion-up': 'accordion-up 0.2s ease-out',
      },
      backgroundImage: {
        'insta-gradient': 'linear-gradient(45deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)',
        'insta-gradient-horizontal': 'linear-gradient(90deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)',
        'insta-gradient-vertical': 'linear-gradient(180deg, #833AB4 0%, #FD1D1D 50%, #FCAF45 100%)',
      },
    },
  },
  plugins: [require('tailwindcss-animate'), require('@tailwindcss/typography')],
} satisfies Config;

export default config;

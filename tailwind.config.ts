import type { Config } from 'tailwindcss';

const config: Config = {
  darkMode: 'class',
  content: [
    './src/app/**/*.{js,ts,jsx,tsx}',
    './src/pages/**/*.{js,ts,jsx,tsx}',
    './src/components/**/*.{js,ts,jsx,tsx}',
    './src/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    fontFamily: {
      sans: [
        'Google Sans',
        'Product Sans',
        'system-ui',
        'sans-serif',
      ],
    },
    extend: {
      colors: {
        primary: {
          yellow: '#FFD700',
          yellowAccent: '#FFC107',
          deepBlue: '#4285F4',
          indigo: '#3F51B5',
        },
        porcelain: '#F8F9FA',
        frost: '#E8EAF6',
        green: '#34A853',
        orange: '#FF6B35',
        red: '#EA4335',
        obsidian: '#212121',
        gray: '#9E9E9E',
      },
      borderRadius: {
        card: '16px',
      },
      boxShadow: {
        card: '0 2px 8px 0 rgba(33,33,33,0.10)',
        cardHover: '0 6px 16px 0 rgba(33,33,33,0.18)',
      },
      maxWidth: {
        container: '1200px',
      },
      spacing: {
        24: '24px',
        32: '32px',
      },
      fontSize: {
        h1: ['48px', { lineHeight: '1.1', letterSpacing: '-0.5px', fontWeight: '700' }],
        h2: ['32px', { fontWeight: '700' }],
        h3: ['24px', { fontWeight: '500' }],
        body: ['16px', { lineHeight: '1.6', fontWeight: '400' }],
        caption: ['14px', { fontWeight: '400' }],
      },
    },
  },
  plugins: [],
};

export default config;

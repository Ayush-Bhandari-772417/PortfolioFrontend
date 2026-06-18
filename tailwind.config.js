// frontend2\tailwind.config.js
/** @type {import('tailwindcss').Config} */
module.exports = {
  theme: {
    extend: {
      colors: {
        navy: {
          50: '#f8fafc',
          500: '#3b82f6',
          600: '#2563eb',
          700: '#1d4ed8',
          800: '#1e40af',
          900: '#1e3a8a',
          950: '#0f172a',
        },
        ocean: {
          900: '#0a1428',
          950: '#020617',
        },
        blueGlow: '#60a5fa',
      },
      fontFamily: {
        sans: ['Inter', 'ui-sans-serif', 'system-ui', 'sans-serif'],
      },
      boxShadow: {
        'glow-blue': '0 0 20px rgba(59, 130, 246, 0.3)',
        'glow-lg': '0 25px 50px -12px rgba(0, 0, 0, 0.25)',
        'navy-glow': '0 0 30px rgba(30, 58, 138, 0.4)',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-out',
        'slide-up': 'slideUp 0.6s ease-out',
        'glow-pulse': 'glowPulse 2s ease-in-out infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { opacity: '0', transform: 'translateY(20px)' },
          '100%': { opacity: '1', transform: 'translateY(0)' },
        },
        glowPulse: {
          '0%, 100%': { boxShadow: '0 0 20px rgba(59, 130, 246, 0.3)' },
          '50%': { boxShadow: '0 0 40px rgba(59, 130, 246, 0.6)' },
        },
      },
      typography: (theme) => ({
        DEFAULT: {
          css: {
            figcaption: {
              marginTop: theme('spacing.1.5'),
              marginBottom: '0',
              textAlign: 'left',
              fontStyle: 'italic',
              color: theme('colors.navy.600'),
              fontSize: theme('fontSize.sm'),
            },
            'figure > * + *': {
              marginTop: theme('spacing.1.5'),
            },
            '.table-caption, .figure-caption, .equation-caption': {
              marginTop: theme('spacing.1'),
              marginBottom: theme('spacing.3'),
              fontStyle: 'italic',
              color: theme('colors.navy.600'),
            },
            figure: {
              marginTop: theme('spacing.5'),
              marginBottom: theme('spacing.5'),
            },
            caption: {
              marginBottom: theme('spacing.2'),
              textAlign: 'left',
              fontStyle: 'italic',
              color: theme('colors.navy.600'),
            },
          },
        },
        lg: {
          css: {
            figcaption: {
              marginTop: theme('spacing.2'),
            },
            figure: {
              marginTop: theme('spacing.6'),
              marginBottom: theme('spacing.6'),
            },
          },
        },
      }),
    },
  },
  plugins: [
    require('@tailwindcss/typography'),
  ],
};

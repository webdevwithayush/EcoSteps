module.exports = {
  content: ["./pages/*.{html,js}", "./index.html"],
  theme: {
    extend: {
      colors: {
        primary: {
          50: "#F0F7F2", // light-forest-green
          100: "#D4E8DA", // pale-forest-green
          200: "#A9D1B5", // soft-forest-green
          300: "#7EBA90", // medium-forest-green
          400: "#53A36B", // forest-green
          500: "#2D5A3D", // deep-forest-green
          600: "#244831", // darker-forest-green
          700: "#1B3625", // darkest-forest-green
          800: "#122419", // forest-black
          900: "#09120C", // deep-forest-black
          DEFAULT: "#2D5A3D", // deep-forest-green
        },
        secondary: {
          50: "#F7F2ED", // light-earth
          100: "#EDE0D1", // pale-earth
          200: "#DBC1A3", // soft-earth
          300: "#C9A275", // medium-earth
          400: "#B78347", // earth-brown-light
          500: "#8B4513", // earth-brown
          600: "#6F370F", // darker-earth
          700: "#53290B", // darkest-earth
          800: "#371B07", // earth-black
          900: "#1B0D04", // deep-earth-black
          DEFAULT: "#8B4513", // earth-brown
        },
        accent: {
          50: "#FDF6F0", // light-terracotta
          100: "#FAE8D6", // pale-terracotta
          200: "#F5D1AD", // soft-terracotta
          300: "#F0BA84", // medium-terracotta
          400: "#EBA35B", // terracotta-light
          500: "#D2691E", // terracotta-orange
          600: "#A85418", // darker-terracotta
          700: "#7E3F12", // darkest-terracotta
          800: "#542A0C", // terracotta-black
          900: "#2A1506", // deep-terracotta-black
          DEFAULT: "#D2691E", // terracotta-orange
        },
        background: "#FAFAF9", // warm-off-white
        surface: "#FFFFFF", // pure-white
        text: {
          primary: "#1A1A1A", // near-black
          secondary: "#6B7280", // medium-gray
        },
        success: {
          50: "#ECFDF5", // light-success
          100: "#D1FAE5", // pale-success
          200: "#A7F3D0", // soft-success
          300: "#6EE7B7", // medium-success
          400: "#34D399", // success-light
          500: "#059669", // vibrant-green
          600: "#047857", // darker-success
          700: "#065F46", // darkest-success
          800: "#064E3B", // success-black
          900: "#022C22", // deep-success-black
          DEFAULT: "#059669", // vibrant-green
        },
        warning: {
          50: "#FFFBEB", // light-warning
          100: "#FEF3C7", // pale-warning
          200: "#FDE68A", // soft-warning
          300: "#FCD34D", // medium-warning
          400: "#FBBF24", // warning-light
          500: "#D97706", // amber-warning
          600: "#B45309", // darker-warning
          700: "#92400E", // darkest-warning
          800: "#78350F", // warning-black
          900: "#451A03", // deep-warning-black
          DEFAULT: "#D97706", // amber-warning
        },
        error: {
          50: "#FEF2F2", // light-error
          100: "#FEE2E2", // pale-error
          200: "#FECACA", // soft-error
          300: "#FCA5A5", // medium-error
          400: "#F87171", // error-light
          500: "#DC2626", // clear-red
          600: "#B91C1C", // darker-error
          700: "#991B1B", // darkest-error
          800: "#7F1D1D", // error-black
          900: "#450A0A", // deep-error-black
          DEFAULT: "#DC2626", // clear-red
        },
      },
      fontFamily: {
        inter: ['Inter', 'sans-serif'], // headings
        'source-sans': ['Source Sans Pro', 'sans-serif'], // body
        nunito: ['Nunito Sans', 'sans-serif'], // captions
        mono: ['JetBrains Mono', 'monospace'], // data
        sans: ['Inter', 'sans-serif'], // default
      },
      fontSize: {
        'xs': ['0.75rem', { lineHeight: '1rem' }],
        'sm': ['0.875rem', { lineHeight: '1.25rem' }],
        'base': ['1rem', { lineHeight: '1.5rem' }],
        'lg': ['1.125rem', { lineHeight: '1.75rem' }],
        'xl': ['1.25rem', { lineHeight: '1.75rem' }],
        '2xl': ['1.5rem', { lineHeight: '2rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
      },
      boxShadow: {
        'organic': '0 4px 6px -1px rgba(45, 90, 61, 0.1), 0 2px 4px -1px rgba(45, 90, 61, 0.1)',
        'organic-hover': '0 10px 15px -3px rgba(45, 90, 61, 0.15), 0 4px 6px -2px rgba(45, 90, 61, 0.15)',
        'soft': '0 1px 3px 0 rgba(45, 90, 61, 0.1), 0 1px 2px 0 rgba(45, 90, 61, 0.06)',
      },
      borderColor: {
        DEFAULT: 'rgba(107, 114, 128, 0.2)', // subtle-gray-border
        accent: '#2D5A3D', // primary-border
      },
      transitionTimingFunction: {
        'organic': 'cubic-bezier(0.4, 0, 0.2, 1)',
      },
      transitionDuration: {
        '150': '150ms',
        '200': '200ms',
        '300': '300ms',
      },
      animation: {
        'shimmer': 'shimmer 2s linear infinite',
        'pulse-gentle': 'pulse-gentle 2s ease-in-out infinite',
        'float': 'float 2s ease-in-out infinite',
      },
      keyframes: {
        shimmer: {
          '0%': { backgroundPosition: '-200px 0' },
          '100%': { backgroundPosition: 'calc(200px + 100%) 0' },
        },
        'pulse-gentle': {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.8' },
        },
        float: {
          '0%, 100%': { transform: 'translateY(0px)' },
          '50%': { transform: 'translateY(-2px)' },
        },
      },
      scale: {
        '102': '1.02',
      },
    },
  },
  plugins: [],
}
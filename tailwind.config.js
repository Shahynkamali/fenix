const defaultTheme = require('tailwindcss/defaultTheme');

module.exports = {
  purge: false,
  future: {
    removeDeprecatedGapUtilities: true,
  },
  experimental: {
    applyComplexClasses: true,
  },
  theme: {
    extend: {
      fontFamily: {
        sans: ['Inter var', ...defaultTheme.fontFamily.sans],
      },
    },
    fill: (theme) => ({
      red: theme('colors.red.500'),
      green: theme('colors.green.500'),
      blue: theme('colors.blue.500'),
      gray: theme('colors.gray.500'),
      orange: theme('colors.orange.500'),
      yellow: theme('colors.yellow.500'),
      teal: theme('colors.teal.500'),
      indigo: theme('colors.indigo.500'),
      purple: theme('colors.purple.500'),
      pink: theme('colors.pink.500'),
      black: theme('colors.black.500'),
      white: '#FFF',
    }),
    minWidth: {
      0: '0',
      '1/4': '0.25rem',
      '1/2': '0.5rem',
      '3/4': '0.75rem',
      1: '1rem',
      2: '2rem',
      3: '3rem',
      4: '4rem',
      5: '5rem',
      6: '6rem',
    },
    maxWidth: {
      1: '1rem',
      2: '2rem',
      3: '3rem',
    },
  },
  variants: {
    appearance: ['responsive'],
    backgroundAttachment: ['responsive'],
    backgroundColor: ['responsive', 'hover', 'focus'],
    backgroundPosition: ['responsive'],
    backgroundRepeat: ['responsive'],
    backgroundSize: ['responsive'],
    borderCollapse: [],
    borderColor: ['responsive', 'hover', 'focus'],
    hasBorderRadius: ['responsive'],
    borderStyle: ['responsive'],
    borderWidth: ['responsive'],
    cursor: ['responsive'],
    display: ['responsive', 'group-hover'],
    flexDirection: ['responsive'],
    flexWrap: ['responsive'],
    alignItems: ['responsive'],
    alignSelf: ['responsive'],
    justifyContent: ['responsive'],
    alignContent: ['responsive'],
    flex: ['responsive'],
    flexGrow: ['responsive'],
    flexShrink: ['responsive'],
    float: ['responsive'],
    fontFamily: ['responsive'],
    fontWeight: ['responsive', 'hover', 'focus'],
    height: ['responsive'],
    lineHeight: ['responsive'],
    listStylePosition: ['responsive'],
    listStyleType: ['responsive'],
    margin: ['responsive'],
    maxHeight: ['responsive'],
    maxWidth: ['responsive'],
    minHeight: ['responsive'],
    minWidth: ['responsive'],
    negativeMargin: ['responsive'],
    objectFit: ['responsive'],
    objectPosition: ['responsive'],
    opacity: ['responsive'],
    outline: ['focus'],
    overflow: ['responsive'],
    padding: ['responsive'],
    pointerEvents: ['responsive'],
    position: ['responsive'],
    inset: ['responsive'],
    resize: ['responsive'],
    boxShadow: ['responsive', 'hover', 'focus'],
    fill: [],
    stroke: [],
    tableLayout: ['responsive', 'hover', 'focus'],
    textAlign: ['responsive'],
    textColor: ['responsive', 'hover', 'focus'],
    fontSize: ['responsive'],
    fontStyle: ['responsive'],
    textTransform: ['responsive'],
    textDecoration: ['responsive', 'hover', 'focus'],
    fontSmoothing: ['responsive'],
    letterSpacing: ['responsive'],
    userSelect: ['responsive'],
    verticalAlign: ['responsive'],
    visibility: ['responsive', 'hover', 'group-hover'],
    whitespace: ['responsive'],
    wordBreak: ['responsive'],
    width: ['responsive'],
    zIndex: ['responsive'],
  },
  corePlugins: {
    container: false,
  },
  plugins: [
    require('@tailwindcss/ui'),
  ],
};

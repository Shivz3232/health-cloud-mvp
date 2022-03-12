module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    // colors: {
    //   transparent: 'transparent',
    //   current: 'currentColor',
    //   "alpha": "#F7F7F7",
    //   "beta": "#FFB72B",
    //   "gamma": "#FFE61B",
    //   "delta": "#B5FE83",
    // },
    extend: {
      colors: {
        alpha: '#F7F7F7',
        beta: '#FFB72B',
        gamma: '#FFE61B',
        delta: '#B5FE83',
      },
    },
  },
  plugins: [],
};

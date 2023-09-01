const FONT_PRIMARY = "'Inter', sans-serif"; 
const typography = {
  fontFamily: FONT_PRIMARY,
  fontWeightRegular: 400,
  fontWeightMedium: 600,
  fontWeightBold: 700,
  h1: {
    fontWeight: 700,
    lineHeight: 80 / 64,
    fontSize: "30px",
    '@media (min-width:600px)': {
      fontSize: "40px",
    },
    '@media (min-width:900px)': {
      fontSize: "45px",
    },
    '@media (min-width:1200px)': {
      fontSize: "54px",
    },
  },
  body1: {
    fontWeight: 400,
    fontSize: "20px",
  },
  body2: {
    fontWeight: 400,
    fontSize: "18px",
  },
};
export default typography;
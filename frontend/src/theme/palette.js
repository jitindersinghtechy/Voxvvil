// const PRIMARY = {
//     light: 'rgba(68, 14, 102, 0.1)',
//     main: '#440E66',
//   };
// const SECONDARY = {
//   main: '#32CD32',
// };
// const INFO = {
//   main: '#616161',
// };
// const WARNING = {
//   light : "#ff9800",
//   main: '#C53E4E',
// };
// const ERROR = {
//   light: '#ef5350',
//   main: '#C53E4E',
// };
// const BACKGROUND = {
//   paper : "#fff",
//   paper1 : "#F3F3F3"
// }
// const BACKGROUNDCOLOR = {
//   paper : "White",
//   paper1 : "#F3F3F3"
// }

const PRIMARY = {
  light: '#F6FCFF',
  main: '#69CBF9',
};
const SECONDARY = {
  main: '#ccc',
};

const COMMON = {
  primary: { ...PRIMARY, contrastText: '#fff' },
  secondary: { ...SECONDARY, contrastText: '#052F5D' },
  // info: { ...INFO, contrastText: '#fff' },
  // warning: { ...WARNING, contrastText: '#fff' },
  // error: { ...ERROR, contrastText: '#fff' },
  // background:  BACKGROUND,
  // backgroundColor: BACKGROUNDCOLOR,
};

const palette = {
  ...COMMON,
  mode: 'light',
  text: {
    primary: "#052F5D",
 
  },
};

export default palette;

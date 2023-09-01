import { createTheme, ThemeProvider, StyledEngineProvider } from "@mui/material/styles";
import palette from "./palette";


export default function CustomTheme({ children }) {
   const theme= createTheme({
      palette
   });

   // theme.components = {
   //    MuiContainer: {
   //       styleOverrides: {
   //          root: {
   //             maxWidth: "1370px!important",
   //             paddingLeft: "25px!important",
   //             paddingRight: "25px!important",
   //          },
   //       },
   //    },
   //    MuiInput: {
   //       styleOverrides: {
   //          root: {
   //             marginTop: "32px!important",
   //             backgroundColor: "#fff",
   //             border: "1px solid #CCCCCC",
   //             borderRadius: "6px",
   //             minHeight: "19px",
   //             "&.Mui-focused": {
   //                border: `1px solid ${theme.palette?.text?.primary}`,
   //             },
   //             input: {
   //                padding: "14px 20px",
   //                fontSize: "16px",
   //                minHeight: "19px",
   //                color: theme.palette?.text?.primary,
   //                "&::placeholder": {
   //                   opacity: 0.4,
   //                   color: theme.palette?.text?.primary,
   //                },
   //             },
   //          },
   //       },
   //    },
   //    MuiInputLabel: {
   //       styleOverrides: {
   //          root: {
   //             fontWeight: 500,
   //             fontSize: "18px",
   //             color: theme.palette?.text?.primary,
   //             "&.Mui-required span": {
   //                color: "#C53E4E",
   //             },
   //          },
   //       },
   //    },
   //    MuiSelect: {
   //       styleOverrides: {
   //          select: {
   //             padding: "14px 20px",
   //             height: "22px",
   //             minHeight: "19px",
   //             fontSize: "16px",
   //             color: theme.palette?.text?.primary,
   //             "&::placeholder": {
   //                opacity: 0.4,
   //                color: theme.palette?.text?.primary,
   //             },
   //             "&.MuiSelect-select p": {
   //                fontSize: "16px",
   //             },
   //          },
   //       },
   //    },
   // };

   return (
      <StyledEngineProvider injectFirst>
         <ThemeProvider theme={theme}>{children}</ThemeProvider>
      </StyledEngineProvider>
   );
}

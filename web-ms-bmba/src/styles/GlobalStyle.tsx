import { createTheme } from "@mui/material/styles";
import { blue, green, purple, yellow, } from "@mui/material/colors";

export const theme = createTheme({
    components: {
      MuiCssBaseline: {
        styleOverrides: {
          body: {
            scrollbarColor: "#5f5f60 #2b2b2b",
            "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
              backgroundColor: "rgb(61, 61, 63)",
              width: '0.7em'
            },
            "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
              borderRadius: 8,
              backgroundColor: "#6b6b6b",
              minHeight: 24,
              border: "3px solid #2b2b2b",
            },
            "&::-webkit-scrollbar-thumb:focus, & *::-webkit-scrollbar-thumb:focus": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-thumb:active, & *::-webkit-scrollbar-thumb:active": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-thumb:hover, & *::-webkit-scrollbar-thumb:hover": {
              backgroundColor: "#959595",
            },
            "&::-webkit-scrollbar-corner, & *::-webkit-scrollbar-corner": {
              backgroundColor: "#2b2b2b",
            },
          },
        },
      },
    },
    palette: {
      primary: {//bgcolor
        main: '#FF8F00',
        700: blue[700],
        800: blue[800],
        900: blue[900],
        A100: '#ffc14b',
        A200: blue['A200'],
        light: "#ffffff",
        dark: "#232f3e",
      },
      secondary: {//color
        main: '#f0c14b',
        light: "#607489",
        dark: "white",
      },
      info: {//header bgcolor
        main: "#232f3e",
        200: blue[200],
        light: "#051e3932",
        dark: "#232f3e",
      },
      success: {//header color
        main: green[300],
        light: "#000f1f32",
        dark: "white",
      },
      common: {
        black: '#000000',
        white: '#ffffff',
      },
      action: {
        hover: '#dc7d04',
      }
    },
  });

  // #f0c14b  yellow 
  // #FF8F00  orange - yellow
  // 232f3e   blue - gray

  // palette: {
  //   primary: {//bgcolor
  //     main: blue[500],
  //     600: blue[600],
  //     700: blue[700],
  //     800: blue[800],
  //     900: blue[900],
  //     A100: blue['A100'],
  //     A200: blue['A200'],
  //     light: "#ffffff",
  //     dark: "#0b2948",
  //   },
  //   secondary: {//color
  //     main: purple[500],
  //     light: "#607489",
  //     dark: "white",
  //   },
  //   info: {//header bgcolor
  //     main: blue[100],
  //     200: blue[200],
  //     light: "#051e3932",
  //     dark: "#031d35d5",
  //   },
  //   success: {//header color
  //     main: green[300],
  //     light: "#000f1f32",
  //     dark: "white",
  //   },
  //   common: {
  //     black: '#000000',
  //     white: '#ffffff',
  //   },
  // },

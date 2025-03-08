import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "light", // ✅ Default Mode: Light
    primary: {
      main: "#FF9900", // AWS Primary Orange
    },
    secondary: {
      main: "#F0C14B", // AWS Yellow
    },
    background: {
      default: "#FFFFFF", // ✅ Light Background
      paper: "#F3F3F3", // Sidebar Background
    },
    text: {
      primary: "#232F3E", // ✅ Dark Text for Light Mode
      secondary: "#37475A",
    },
    info: {
      main: "#232F3E", // AWS Console Header Background
      light: "#051e39",
      dark: "#1A2530",
    },
    success: {
      main: "#2ECC71", // Green for success messages
    },
    common: {
      black: "#000000",
      white: "#ffffff",
    },
    action: {
      hover: "#FFB74D", // Lighter Orange Hover (AWS-Like)
    },
  },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: {
          scrollbarColor: "#5f5f60 hsl(213, 27.80%, 19.00%)",
          "&::-webkit-scrollbar, & *::-webkit-scrollbar": {
            backgroundColor: "#EAEDED", // ✅ Light Mode Scrollbar Background
            width: "0.7em",
          },
          "&::-webkit-scrollbar-thumb, & *::-webkit-scrollbar-thumb": {
            borderRadius: 8,
            backgroundColor: "#A0A0A0", // Light mode scrollbar color
            minHeight: 24,
            border: "3px solid #EAEDED",
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
            backgroundColor: "#EAEDED",
          },
          backgroundColor: "#FFFFFF", // ✅ Set Light Background by Default
          color: "#232F3E", // ✅ Dark Text for Light Mode
        },
      },
    },
    MuiLink: { // ✅ Correct component name for MUI v5
      styleOverrides: {
        root: {
          color: "#0073BB", // ✅ AWS Blue
          textDecoration: "none",
          "&:hover": {
            color: "#00518A", // ✅ Darker AWS Blue on Hover
          },
        },
      },
    },
  },
});


 
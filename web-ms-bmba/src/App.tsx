import { CssBaseline, ThemeProvider } from "@mui/material";
import { theme } from "./styles/GlobalStyle";
import React from "react";
import AppRoutes from "./routes/routes";
import { GoogleOAuthProvider } from "@react-oauth/google";

const clientId = "607136300467-g0ie8ai8lilut8sb93l3qu72jl4o906q.apps.googleusercontent.com";

function App() {
  return (
    <GoogleOAuthProvider clientId={clientId}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <AppRoutes />
      </ThemeProvider>
    </GoogleOAuthProvider>
  );
}

export default App;

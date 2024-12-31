import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { ThemeProvider, createTheme } from "@mui/material/styles";
import "./index.css";
import "./App.css";
import App from "./App.jsx";
import { AppProvider } from "./context/AppContext";

const theme = createTheme({
  typography: {
    fontFamily: "Afacad Flux, Helvetica, Arial, sans-serif",
  },
});

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <ThemeProvider theme={theme}>
      <AppProvider>
        <App />
      </AppProvider>
    </ThemeProvider>
  </StrictMode>
);

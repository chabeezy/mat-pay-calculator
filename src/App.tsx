import React from "react";
import "./App.css";
import {
  Container,
  Box,
  Typography,
  ThemeProvider,
  createTheme,
  CssBaseline,
  AppBar,
} from "@mui/material";
import PayForm from "./components/PayForm";
import ResultsView from "./components/ResultsView";
import { useAppSelector } from "./app/hooks";

const theme = createTheme({
  typography: {
    fontFamily: [
      "-apple-system",
      "BlinkMacSystemFont",
      '"Segoe UI"',
      "Roboto",
      '"Helvetica Neue"',
      "Arial",
      "sans-serif",
      '"Apple Color Emoji"',
      '"Segoe UI Emoji"',
      '"Segoe UI Symbol"',
    ].join(","),
  },
  components: {
    MuiButton: {
      styleOverrides: {
        root: {
          margin: "28px",
        },
      },
    },
    MuiTextField: {
      styleOverrides: {
        root: {
          margin: "14px",
        },
      },
    },
  },
});

function App() {
  const { salary, weeks, percentage, statutory } = useAppSelector(
    (state) => state.maternity
  );

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
      <header>
        <Box textAlign="center" sx={{ margin: "28px" }}>
          <AppBar position="static">
            <Typography variant="h3" component="h1">
              Maternity Pay Calculator
            </Typography>
          </AppBar>
        </Box>
      </header>
      <Container maxWidth="md">
        {salary && weeks && percentage && statutory ? (
          <ResultsView />
        ) : (
          <PayForm />
        )}
      </Container>
    </ThemeProvider>
  );
}

export default App;

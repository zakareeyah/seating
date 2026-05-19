import { createTheme } from "@mui/material/styles";

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: { main: "#90caf9" },
    background: { default: "#0b0f14", paper: "#141a22" },
  },
  shape: { borderRadius: 12 },
});

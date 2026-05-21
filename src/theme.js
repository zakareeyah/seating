import { alpha, createTheme } from "@mui/material/styles";

const blush = "#EAD1CC";
const burgundy = "#721031";
const winePaper = "#8A2842";
const mutedRose = "#C9A8A3";
const floralRose = "#E8A4B8";
const olive = "#6B7354";

const playfair = '"Playfair Display", Georgia, serif';
const lora = '"Lora", Georgia, serif';

export const theme = createTheme({
  palette: {
    mode: "dark",
    primary: {
      main: blush,
      light: "#F2E4E1",
      dark: "#C9A8A3",
      contrastText: burgundy,
    },
    secondary: {
      main: floralRose,
      light: "#F0C4D4",
      dark: "#C97A94",
      contrastText: burgundy,
    },
    success: {
      main: olive,
      contrastText: blush,
    },
    text: {
      primary: blush,
      secondary: mutedRose,
    },
    divider: alpha(blush, 0.22),
    background: {
      default: burgundy,
      paper: winePaper,
    },
    action: {
      active: blush,
      hover: alpha(blush, 0.08),
      selected: alpha(blush, 0.14),
      disabled: alpha(mutedRose, 0.38),
      disabledBackground: alpha(winePaper, 0.5),
    },
  },
  typography: {
    fontFamily: lora,
    h4: { fontFamily: playfair, fontWeight: 700 },
    h5: { fontFamily: playfair, fontWeight: 700 },
    h6: { fontFamily: playfair, fontWeight: 700 },
    subtitle1: { fontFamily: playfair, fontWeight: 600 },
    overline: {
      fontFamily: playfair,
      fontWeight: 600,
      letterSpacing: "0.12em",
    },
    button: { fontFamily: lora, fontWeight: 600, textTransform: "none" },
  },
  shape: { borderRadius: 12 },
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        "*": {
          scrollbarWidth: "thin",
          scrollbarColor: `${alpha(blush, 0.45)} ${alpha(burgundy, 0.85)}`,
        },
        "*::-webkit-scrollbar": {
          width: 8,
          height: 8,
        },
        "*::-webkit-scrollbar-track": {
          background: alpha(burgundy, 0.85),
          borderRadius: 8,
        },
        "*::-webkit-scrollbar-thumb": {
          backgroundColor: alpha(blush, 0.45),
          borderRadius: 8,
          border: `2px solid ${alpha(burgundy, 0.85)}`,
        },
        "*::-webkit-scrollbar-thumb:hover": {
          backgroundColor: alpha(blush, 0.7),
        },
      },
    },
  },
});

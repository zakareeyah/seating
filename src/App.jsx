import { Routes, Route, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Box, BottomNavigation, BottomNavigationAction, Toolbar, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import FloatingGlowBackground from "./components/FloatingGlowBackground.jsx";
import {
  appTagline,
  coupleNames,
  navAbout,
  navFindSeat,
  navHelp,
} from "./content/wedding.js";
import Home from "./pages/Home.jsx";
import About from "./pages/About.jsx";
import Info from "./pages/Info.jsx";

const navPaths = ["/", "/about", "/info"];

function MobileLayout() {
  const navigate = useNavigate();
  const location = useLocation();
  const value = Math.max(0, navPaths.indexOf(location.pathname));

  return (
    <Box
      sx={{
        position: "relative",
        width: "100%",
        height: "100vh",
        "@supports (height: 100dvh)": {
          height: "100dvh",
        },
        overflow: "hidden",
        display: "flex",
        flexDirection: "column",
        bgcolor: "transparent",
        // Mobile-first: safe areas on notched devices; no desktop “phone frame”.
        pt: "env(safe-area-inset-top)",
      }}
    >
      <FloatingGlowBackground />
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          top: 0,
          zIndex: 1,
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.82),
          backdropFilter: "blur(12px)",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar
          sx={{
            flexDirection: "column",
            alignItems: "center",
            textAlign: "center",
            py: 1.5,
            gap: 0.25,
            minHeight: "unset",
            width: "100%",
          }}
        >
          <Typography variant="h6" component="h1" fontWeight={700}>
            {coupleNames}
          </Typography>
          <Typography variant="caption" color="text.secondary">
            {appTagline}
          </Typography>
        </Toolbar>
      </AppBar>

      <Box
        component="main"
        sx={{
          position: "relative",
          zIndex: 1,
          flex: 1,
          width: "100%",
          minHeight: 0,
          overflow: "auto",
          px: 2,
          pt: 1.5,
          pb: "calc(56px + max(8px, env(safe-area-inset-bottom)) + 12px)",
          bgcolor: "transparent",
        }}
      >
        <Box
          sx={{
            width: "100%",
            maxWidth: { xs: "100%", sm: 520 },
            mx: "auto",
          }}
        >
          <Outlet />
        </Box>
      </Box>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => navigate(navPaths[newValue])}
        sx={{
          position: "fixed",
          bottom: 0,
          left: 0,
          right: 0,
          zIndex: 2,
          width: "100%",
          borderTop: 1,
          borderColor: "divider",
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.88),
          backdropFilter: "blur(12px)",
          pt: 0.5,
          pb: "max(8px, env(safe-area-inset-bottom))",
        }}
      >
        <BottomNavigationAction label={navFindSeat} icon={<HomeRoundedIcon />} />
        <BottomNavigationAction label={navAbout} icon={<InfoOutlinedIcon />} />
        <BottomNavigationAction label={navHelp} icon={<HelpOutlineRoundedIcon />} />
      </BottomNavigation>
    </Box>
  );
}

export default function App() {
  return (
    <Routes>
      <Route element={<MobileLayout />}>
        <Route index element={<Home />} />
        <Route path="about" element={<About />} />
        <Route path="info" element={<Info />} />
      </Route>
    </Routes>
  );
}

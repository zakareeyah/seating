import { Routes, Route, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Box, BottomNavigation, BottomNavigationAction, Toolbar, Typography } from "@mui/material";
import { alpha } from "@mui/material/styles";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
import FloatingGlowBackground from "./components/FloatingGlowBackground.jsx";
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
        minHeight: "100vh",
        "@supports (min-height: 100dvh)": {
          minHeight: "100dvh",
        },
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
            Seating
          </Typography>
          <Typography variant="caption" color="text.secondary">
            GitHub Pages test app
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
          py: 1.5,
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
          position: "relative",
          zIndex: 1,
          width: "100%",
          flexShrink: 0,
          borderTop: 1,
          borderColor: "divider",
          bgcolor: (theme) => alpha(theme.palette.background.paper, 0.88),
          backdropFilter: "blur(12px)",
          pt: 0.5,
          pb: "max(8px, env(safe-area-inset-bottom))",
        }}
      >
        <BottomNavigationAction label="Home" icon={<HomeRoundedIcon />} />
        <BottomNavigationAction label="About" icon={<InfoOutlinedIcon />} />
        <BottomNavigationAction label="Info" icon={<HelpOutlineRoundedIcon />} />
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

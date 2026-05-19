import { Routes, Route, Outlet, useNavigate, useLocation } from "react-router-dom";
import { AppBar, Box, BottomNavigation, BottomNavigationAction, Toolbar, Typography } from "@mui/material";
import HomeRoundedIcon from "@mui/icons-material/HomeRounded";
import InfoOutlinedIcon from "@mui/icons-material/InfoOutlined";
import HelpOutlineRoundedIcon from "@mui/icons-material/HelpOutlineRounded";
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
        width: "100%",
        minHeight: "100vh",
        "@supports (min-height: 100dvh)": {
          minHeight: "100dvh",
        },
        display: "flex",
        flexDirection: "column",
        bgcolor: "background.default",
        // Mobile-first: safe areas on notched devices; no desktop “phone frame”.
        pt: "env(safe-area-inset-top)",
      }}
    >
      <AppBar
        position="sticky"
        color="transparent"
        elevation={0}
        sx={{
          top: 0,
          bgcolor: "background.paper",
          borderBottom: 1,
          borderColor: "divider",
        }}
      >
        <Toolbar
          sx={{
            flexDirection: "column",
            alignItems: "flex-start",
            py: 1.5,
            gap: 0.25,
            minHeight: "unset",
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
          flex: 1,
          width: "100%",
          minHeight: 0,
          overflow: "auto",
          px: 2,
          py: 1.5,
        }}
      >
        <Outlet />
      </Box>

      <BottomNavigation
        showLabels
        value={value}
        onChange={(_, newValue) => navigate(navPaths[newValue])}
        sx={{
          width: "100%",
          flexShrink: 0,
          borderTop: 1,
          borderColor: "divider",
          bgcolor: "background.paper",
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

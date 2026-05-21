import { Box, useTheme } from "@mui/material";
import { alpha } from "@mui/material/styles";

/** Static blurred glow blobs (no motion). useRose: floral rose tint instead of blush. */
const ORBS = [
  { w: 220, h: 200, left: "6%", top: "10%", opacity: 0.52 },
  { w: 160, h: 180, left: "72%", top: "8%", opacity: 0.48, useRose: true },
  { w: 280, h: 240, left: "38%", top: "42%", opacity: 0.42 },
  { w: 140, h: 160, left: "12%", top: "58%", opacity: 0.46, useRose: true },
  { w: 200, h: 190, left: "78%", top: "52%", opacity: 0.5 },
  { w: 120, h: 140, left: "48%", top: "78%", opacity: 0.4, useRose: true },
  { w: 100, h: 120, left: "85%", top: "28%", opacity: 0.38 },
];

function orbSx(orb, primary) {
  return {
    position: "absolute",
    width: orb.w,
    height: orb.h,
    left: orb.left,
    top: orb.top,
    borderRadius: "50%",
    opacity: orb.opacity,
    background: `radial-gradient(circle at 35% 35%, ${alpha(primary, 0.5)} 0%, ${alpha(primary, 0.12)} 45%, transparent 72%)`,
    boxShadow: `0 0 70px 36px ${alpha(primary, 0.22)}`,
    filter: "blur(22px)",
  };
}

export default function FloatingGlowBackground() {
  const theme = useTheme();
  const primary = theme.palette.primary.main;
  const rose = theme.palette.secondary.main;

  return (
    <Box
      sx={{
        position: "fixed",
        inset: 0,
        zIndex: 0,
        pointerEvents: "none",
        overflow: "hidden",
      }}
      aria-hidden
    >
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          bgcolor: "background.default",
        }}
      />
      <Box
        sx={{
          position: "absolute",
          inset: 0,
          background: [
            `radial-gradient(ellipse 100% 60% at 50% -10%, ${alpha(primary, 0.16)} 0%, transparent 55%)`,
            `radial-gradient(ellipse 80% 50% at 100% 60%, ${alpha(primary, 0.08)} 0%, transparent 50%)`,
            `radial-gradient(ellipse 70% 45% at 0% 80%, ${alpha(primary, 0.07)} 0%, transparent 45%)`,
          ].join(", "),
        }}
      />
      {ORBS.map((orb, i) => (
        <Box key={i} sx={orbSx(orb, orb.useRose ? rose : primary)} />
      ))}
    </Box>
  );
}

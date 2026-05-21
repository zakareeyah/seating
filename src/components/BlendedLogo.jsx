import { Box } from "@mui/material";
import { coupleNames } from "../content/wedding.js";
import logoUrl from "../logo.png";

const logoMask = `radial-gradient(
  ellipse 72% 88% at 50% 44%,
  #000 58%,
  transparent 100%
)`;

export default function BlendedLogo({ maxWidth = 280, sx }) {
  return (
    <Box
      component="img"
      src={logoUrl}
      alt={`${coupleNames} wedding monogram`}
      sx={{
        width: "100%",
        maxWidth,
        height: "auto",
        mx: "auto",
        display: "block",
        maskImage: logoMask,
        WebkitMaskImage: logoMask,
        ...sx,
      }}
    />
  );
}

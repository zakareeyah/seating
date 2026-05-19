import { Link as RouterLink } from "react-router-dom";
import { Box, Link, Stack, Typography } from "@mui/material";

export default function Home() {
  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h2" fontWeight={600}>
        Seating app — GitHub Pages test
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Current path (hash route): <strong>#/</strong>
      </Typography>
      <Box component="section">
        <Typography variant="subtitle2" gutterBottom fontWeight={600}>
          After deploy, verify:
        </Typography>
        <Typography component="ol" variant="body2" color="text.secondary" sx={{ pl: 2, m: 0 }}>
          <li>Open your Pages URL (see README).</li>
          <li>Confirm MUI styles and layout load.</li>
          <li>Use the bottom tabs; the address bar should show <code>#/about</code> or <code>#/info</code>.</li>
        </Typography>
      </Box>
      <Typography variant="body2">
        Jump to{" "}
        <Link component={RouterLink} to="/about" underline="hover">
          About
        </Link>{" "}
        or{" "}
        <Link component={RouterLink} to="/info" underline="hover">
          Info
        </Link>{" "}
        without a full reload.
      </Typography>
    </Stack>
  );
}

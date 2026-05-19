import { Typography } from "@mui/material";

export default function Info() {
  return (
    <>
      <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
        Info
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        Third tab for the mobile-style bottom navigation. Path: <strong>#/info</strong>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Seating app — GitHub Pages test
      </Typography>
    </>
  );
}

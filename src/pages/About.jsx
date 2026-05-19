import { Typography } from "@mui/material";

export default function About() {
  return (
    <>
      <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
        About
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        This screen exists only to prove <strong>HashRouter</strong> navigation on GitHub Pages. Path:{" "}
        <strong>#/about</strong>
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Seating app — GitHub Pages test
      </Typography>
    </>
  );
}

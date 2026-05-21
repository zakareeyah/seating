import { Box, Typography } from "@mui/material";
import {
  aboutBody,
  aboutLead,
  aboutTitle,
  coupleNames,
  weddingDate,
} from "../content/wedding.js";

export default function About() {
  return (
    <Box sx={{ textAlign: "center", maxWidth: 440, mx: "auto" }}>
      <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
        {aboutTitle}
      </Typography>
      <Typography variant="overline" color="text.secondary" display="block" gutterBottom>
        {coupleNames} · {weddingDate}
      </Typography>
      <Typography variant="body1" color="text.secondary" paragraph sx={{ mt: 2 }}>
        {aboutLead}
      </Typography>
      <Typography variant="body2" color="text.secondary">
        {aboutBody}
      </Typography>
    </Box>
  );
}

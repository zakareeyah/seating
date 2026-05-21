import { Box, Divider, Stack, Typography } from "@mui/material";
import ShareSection from "../components/ShareSection.jsx";
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
      <Stack spacing={2.5} sx={{ mt: 2, textAlign: "left" }}>
        <Typography variant="body1" color="text.secondary">
          {aboutLead}
        </Typography>
        <Typography variant="body2" color="text.secondary">
          {aboutBody}
        </Typography>
        <Divider />
        <ShareSection />
      </Stack>
    </Box>
  );
}

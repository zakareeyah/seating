import { Box, Divider, Stack, Typography } from "@mui/material";
import { useSearchParams } from "react-router-dom";
import GuestEncryptTool from "../components/GuestEncryptTool.jsx";
import {
  helpHostsNote,
  helpHowBody,
  helpHowTitle,
  helpNoMatchBody,
  helpNoMatchTitle,
  helpTitle,
} from "../content/wedding.js";

export default function Info() {
  const [searchParams] = useSearchParams();
  const debug = searchParams.get("debug");

  return (
    <Box sx={{ textAlign: "center", maxWidth: 440, mx: "auto" }}>
      <Typography variant="h5" component="h2" fontWeight={600} gutterBottom>
        {helpTitle}
      </Typography>
      <Stack spacing={2.5} sx={{ mt: 2, textAlign: "left" }}>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {helpHowTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {helpHowBody}
          </Typography>
        </Box>
        <Box>
          <Typography variant="subtitle1" fontWeight={600} gutterBottom>
            {helpNoMatchTitle}
          </Typography>
          <Typography variant="body2" color="text.secondary">
            {helpNoMatchBody}
          </Typography>
        </Box>
        <Typography variant="caption" color="text.secondary" sx={{ textAlign: "center", display: "block" }}>
          {helpHostsNote}
        </Typography>
        {debug && (
          <>
            <Divider />
            <GuestEncryptTool />
          </>
        )}
      </Stack>
    </Box>
  );
}

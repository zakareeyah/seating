import { useMemo, useState } from "react";
import ContentCopyRoundedIcon from "@mui/icons-material/ContentCopyRounded";
import {
  Alert,
  Box,
  Button,
  Stack,
  Typography,
} from "@mui/material";
import QRCode from "react-qr-code";
import { useLocation, useSearchParams } from "react-router-dom";
import {
  aboutShareBody,
  aboutShareCopied,
  aboutShareCopyButton,
  aboutShareGenericNote,
  aboutShareTitle,
} from "../content/wedding.js";
import { useGuestList } from "../context/GuestDataContext.jsx";
import logoUrl from "../logo.png";
import { buildShareUrl } from "../utils/shareUrl.js";

const QR_SIZE = 200;
const LOGO_SIZE = 44;

export default function ShareSection() {
  const { pathname } = useLocation();
  const [searchParams] = useSearchParams();
  const { status } = useGuestList();
  const password = searchParams.get("id") ?? "";
  const [copied, setCopied] = useState(false);

  const includePassword = status === "ready" && Boolean(password);

  const shareUrl = useMemo(
    () => buildShareUrl({ pathname, password, includePassword }),
    [pathname, password, includePassword],
  );

  async function handleCopy() {
    try {
      await navigator.clipboard.writeText(shareUrl);
      setCopied(true);
    } catch {
      setCopied(false);
    }
  }

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        {aboutShareTitle}
      </Typography>
      <Typography variant="body2" color="text.secondary" paragraph>
        {aboutShareBody}
      </Typography>
      <Stack spacing={2} alignItems="center">
        <Box
          sx={{
            p: 1.5,
            bgcolor: "#FFFFFF",
            borderRadius: 2,
            border: 1,
            borderColor: "divider",
            lineHeight: 0,
          }}
        >
          <Box sx={{ position: "relative", display: "inline-block" }}>
            <QRCode
              value={shareUrl}
              size={QR_SIZE}
              level="H"
              bgColor="#FFFFFF"
              fgColor="#1a1a1a"
            />
            <Box
              sx={{
                position: "absolute",
                top: "50%",
                left: "50%",
                transform: "translate(-50%, -50%)",
                bgcolor: "#FFFFFF",
                borderRadius: 1,
                p: 0.5,
                lineHeight: 0,
              }}
            >
              <Box
                component="img"
                src={logoUrl}
                alt=""
                sx={{
                  width: LOGO_SIZE,
                  height: LOGO_SIZE,
                  display: "block",
                  objectFit: "contain",
                }}
              />
            </Box>
          </Box>
        </Box>
        <Button
          variant="outlined"
          startIcon={<ContentCopyRoundedIcon />}
          onClick={handleCopy}
          disabled={status === "loading"}
        >
          {aboutShareCopyButton}
        </Button>
        {copied && (
          <Alert severity="success" sx={{ width: "100%" }}>
            {aboutShareCopied}
          </Alert>
        )}
        {!includePassword && status !== "loading" && (
          <Typography variant="caption" color="text.secondary" textAlign="center">
            {aboutShareGenericNote}
          </Typography>
        )}
      </Stack>
    </Box>
  );
}

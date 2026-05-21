import { useRef, useState } from "react";
import UploadFileRoundedIcon from "@mui/icons-material/UploadFileRounded";
import {
  Alert,
  Box,
  Button,
  Stack,
  TextField,
  Typography,
} from "@mui/material";
import {
  encryptToolButton,
  encryptToolDescription,
  encryptToolError,
  encryptToolFileLabel,
  encryptToolInvalidFile,
  encryptToolPasswordLabel,
  encryptToolPasswordRequired,
  encryptToolSuccess,
  encryptToolTitle,
} from "../content/wedding.js";
import { encryptGuestData, isGuestArray } from "../utils/guestCrypto.js";

function downloadJson(data, filename) {
  const blob = new Blob([JSON.stringify(data, null, 2)], {
    type: "application/json",
  });
  const url = URL.createObjectURL(blob);
  const link = document.createElement("a");
  link.href = url;
  link.download = filename;
  link.click();
  URL.revokeObjectURL(url);
}

export default function GuestEncryptTool() {
  const fileInputRef = useRef(null);
  const [fileName, setFileName] = useState("");
  const [guests, setGuests] = useState(null);
  const [password, setPassword] = useState("");
  const [status, setStatus] = useState(null);
  const [message, setMessage] = useState("");
  const [busy, setBusy] = useState(false);

  const handleFileChange = async (event) => {
    const file = event.target.files?.[0];
    setStatus(null);
    setMessage("");
    setGuests(null);
    setFileName("");

    if (!file) return;

    try {
      const text = await file.text();
      const parsed = JSON.parse(text);
      if (!isGuestArray(parsed)) {
        setStatus("error");
        setMessage(encryptToolInvalidFile);
        return;
      }
      setGuests(parsed);
      setFileName(file.name);
    } catch {
      setStatus("error");
      setMessage(encryptToolInvalidFile);
    }
  };

  const handleEncrypt = async () => {
    setStatus(null);
    setMessage("");

    if (!guests) {
      setStatus("error");
      setMessage(encryptToolInvalidFile);
      return;
    }
    if (!password.trim()) {
      setStatus("error");
      setMessage(encryptToolPasswordRequired);
      return;
    }

    setBusy(true);
    try {
      const envelope = await encryptGuestData(guests, password);
      downloadJson(envelope, "guests.json");
      setStatus("success");
      setMessage(encryptToolSuccess);
    } catch {
      setStatus("error");
      setMessage(encryptToolError);
    } finally {
      setBusy(false);
    }
  };

  return (
    <Box sx={{ textAlign: "left" }}>
      <Typography variant="subtitle1" fontWeight={600} gutterBottom>
        {encryptToolTitle}
      </Typography>
      <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
        {encryptToolDescription}
      </Typography>
      <Stack spacing={2}>
        <Box>
          <input
            ref={fileInputRef}
            type="file"
            accept=".json,application/json"
            hidden
            onChange={handleFileChange}
          />
          <Button
            variant="outlined"
            startIcon={<UploadFileRoundedIcon />}
            onClick={() => fileInputRef.current?.click()}
          >
            {encryptToolFileLabel}
          </Button>
          {fileName && (
            <Typography variant="caption" color="text.secondary" sx={{ display: "block", mt: 1 }}>
              {fileName}
            </Typography>
          )}
        </Box>
        <TextField
          fullWidth
          type="password"
          label={encryptToolPasswordLabel}
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          autoComplete="new-password"
        />
        <Button
          variant="contained"
          onClick={handleEncrypt}
          disabled={busy || !guests}
        >
          {encryptToolButton}
        </Button>
        {status && (
          <Alert severity={status === "success" ? "success" : "error"}>
            {message}
          </Alert>
        )}
      </Stack>
    </Box>
  );
}

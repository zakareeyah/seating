import { useEffect, useMemo, useState } from "react";
import { Link as RouterLink } from "react-router-dom";
import CloseIcon from "@mui/icons-material/Close";
import ClearIcon from "@mui/icons-material/Clear";
import EventSeatRoundedIcon from "@mui/icons-material/EventSeatRounded";
import {
  Avatar,
  Box,
  Card,
  CardContent,
  Divider,
  IconButton,
  InputAdornment,
  Link,
  Paper,
  Stack,
  SwipeableDrawer,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  TextField,
  Typography,
} from "@mui/material";
import { alpha } from "@mui/material/styles";
import { motion } from "motion/react";
import { TEST_PEOPLE } from "../data/testPeople.js";
import { filterPeopleByNameQuery } from "../utils/filterPeopleByNameQuery.js";

const drawerEase = [0.22, 1, 0.36, 1];

const drawerContainerVariants = {
  hidden: {
    transition: { staggerChildren: 0.09, staggerDirection: -1 },
  },
  visible: {
    transition: {
      staggerChildren: 0.16,
      delayChildren: 0.14,
    },
  },
};

const drawerItemVariants = {
  hidden: {
    opacity: 0,
    y: 20,
    transition: { duration: 0.34, ease: [0.4, 0, 0.2, 1] },
  },
  visible: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.62, ease: drawerEase },
  },
};

function nameInitial(fullName) {
  const t = fullName.trim();
  return t ? t[0].toUpperCase() : "?";
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [userClosedDrawer, setUserClosedDrawer] = useState(false);

  const matches = useMemo(
    () => filterPeopleByNameQuery(TEST_PEOPLE, query),
    [query],
  );

  const singleMatch = matches.length === 1 ? matches[0] : null;
  const drawerOpen =
    Boolean(singleMatch && query.trim() && !userClosedDrawer);

  useEffect(() => {
    if (matches.length !== 1) {
      setUserClosedDrawer(false);
    }
  }, [matches.length]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setUserClosedDrawer(false);
  };

  const handleRowClick = (person) => {
    setQuery(person.fullName);
    setUserClosedDrawer(false);
  };

  const handleDrawerClose = () => {
    setUserClosedDrawer(true);
  };

  const handleClearQuery = () => {
    setQuery("");
    setUserClosedDrawer(false);
  };

  const showNoMatches = query.trim().length > 0 && matches.length === 0;
  const showTable = matches.length > 1;

  return (
    <Stack spacing={2}>
      <Typography variant="h5" component="h2" fontWeight={600}>
        Find your seat
      </Typography>
      <Typography variant="body2" color="text.secondary">
        Type your name. We match similar names in the guest list (substring, not case
        sensitive).
      </Typography>

      <TextField
        fullWidth
        label="Your name"
        value={query}
        onChange={handleQueryChange}
        placeholder="e.g. Sam or Zephyr"
        autoComplete="name"
        slotProps={{
          input: {
            endAdornment: query ? (
              <InputAdornment position="end">
                <IconButton
                  type="button"
                  aria-label="Clear search"
                  edge="end"
                  size="small"
                  onClick={handleClearQuery}
                >
                  <ClearIcon fontSize="small" />
                </IconButton>
              </InputAdornment>
            ) : null,
          },
        }}
      />

      {showNoMatches && (
        <Typography variant="body2" color="text.secondary">
          No matches for that search.
        </Typography>
      )}

      {showTable && (
        <Box>
          <Typography variant="subtitle2" fontWeight={600} gutterBottom>
            Similar names — tap a row to select
          </Typography>
          <TableContainer
            component={Paper}
            variant="outlined"
            sx={{ maxHeight: 280 }}
          >
            <Table size="small" stickyHeader>
              <TableHead>
                <TableRow>
                  <TableCell>Full name</TableCell>
                  <TableCell>Seating location</TableCell>
                </TableRow>
              </TableHead>
              <TableBody>
                {matches.map((person) => (
                  <TableRow
                    key={person.id}
                    hover
                    sx={{ cursor: "pointer" }}
                    onClick={() => handleRowClick(person)}
                  >
                    <TableCell>{person.fullName}</TableCell>
                    <TableCell>{person.seatingLocation}</TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
      )}

      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={() => {}}
        disableSwipeToOpen
        ModalProps={{ keepMounted: true }}
        PaperProps={{
          sx: {
            width: "100%",
            height: "100vh",
            maxHeight: "100vh",
            borderTopLeftRadius: 0,
            borderTopRightRadius: 0,
            "@supports (height: 100dvh)": {
              height: "100dvh",
              maxHeight: "100dvh",
            },
            px: 2,
            pt: "max(8px, env(safe-area-inset-top))",
            pb: "max(16px, env(safe-area-inset-bottom))",
            boxSizing: "border-box",
            display: "flex",
            flexDirection: "column",
          },
        }}
      >
        <Box
          sx={{
            position: "relative",
            flexShrink: 0,
            height: 40,
            mb: 1,
          }}
        >
          <Box
            sx={{
              position: "absolute",
              left: "50%",
              top: "50%",
              transform: "translate(-50%, -50%)",
              width: 40,
              height: 6,
              borderRadius: 999,
              bgcolor: "divider",
            }}
          />
          <IconButton
            type="button"
            aria-label="Close"
            onClick={handleDrawerClose}
            edge="end"
            size="small"
            sx={{
              position: "absolute",
              right: -4,
              top: "50%",
              transform: "translateY(-50%)",
            }}
          >
            <CloseIcon />
          </IconButton>
        </Box>
        {singleMatch && (
          <motion.div
            key={singleMatch.id}
            variants={drawerContainerVariants}
            initial="hidden"
            animate={drawerOpen ? "visible" : "hidden"}
            style={{
              display: "flex",
              flexDirection: "column",
              gap: 12,
              flex: 1,
              minHeight: 0,
              width: "100%",
              overflow: "auto",
            }}
          >
            <motion.div variants={drawerItemVariants}>
              <Typography variant="overline" color="text.secondary" letterSpacing={1.2}>
                Welcome
              </Typography>
            </motion.div>

            <motion.div variants={drawerItemVariants}>
              <Stack direction="row" spacing={2} alignItems="center" sx={{ py: 0.5 }}>
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    bgcolor: (theme) => alpha(theme.palette.primary.main, 0.2),
                    color: "primary.main",
                  }}
                  aria-hidden
                >
                  {nameInitial(singleMatch.fullName)}
                </Avatar>
                <Typography variant="h4" component="p" fontWeight={800} sx={{ lineHeight: 1.2 }}>
                  {singleMatch.fullName}
                </Typography>
              </Stack>
            </motion.div>

            <motion.div variants={drawerItemVariants}>
              <Divider />
            </motion.div>

            <motion.div variants={drawerItemVariants}>
              <Card
                variant="outlined"
                sx={{
                  borderRadius: 2,
                  bgcolor: (theme) => alpha(theme.palette.primary.main, 0.06),
                  borderColor: "divider",
                }}
              >
                <CardContent sx={{ "&:last-child": { pb: 2 } }}>
                  <Stack direction="row" spacing={1.5} alignItems="flex-start">
                    <EventSeatRoundedIcon color="primary" sx={{ mt: 0.25 }} aria-hidden />
                    <Box>
                      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                        Seating location
                      </Typography>
                      <Typography variant="h6" component="p" fontWeight={700} sx={{ lineHeight: 1.35 }}>
                        {singleMatch.seatingLocation}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>

            {(singleMatch.department || singleMatch.role || singleMatch.title) && (
              <motion.div variants={drawerItemVariants}>
                <Typography variant="body2" color="text.secondary" sx={{ pt: 0.5 }}>
                  {[singleMatch.department, singleMatch.role ?? singleMatch.title]
                    .filter(Boolean)
                    .join(" · ")}
                </Typography>
              </motion.div>
            )}
          </motion.div>
        )}
      </SwipeableDrawer>

      <Typography variant="body2">
        <Link component={RouterLink} to="/about" underline="hover">
          About
        </Link>
        {" · "}
        <Link component={RouterLink} to="/info" underline="hover">
          Info
        </Link>
      </Typography>
    </Stack>
  );
}

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
  useMediaQuery,
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
  const isNarrow = useMediaQuery((t) => t.breakpoints.down("sm"));
  const [query, setQuery] = useState("");
  const [userClosedDrawer, setUserClosedDrawer] = useState(false);
  const [selectedFromTable, setSelectedFromTable] = useState(null);

  const matches = useMemo(
    () => filterPeopleByNameQuery(TEST_PEOPLE, query),
    [query],
  );

  const singleMatch = matches.length === 1 ? matches[0] : null;
  const resolvedPerson = useMemo(() => {
    if (singleMatch) return singleMatch;
    if (
      selectedFromTable &&
      matches.some((m) => m.id === selectedFromTable.id)
    ) {
      return selectedFromTable;
    }
    return null;
  }, [singleMatch, selectedFromTable, matches]);

  const drawerOpen = Boolean(
    resolvedPerson && query.trim() && !userClosedDrawer,
  );

  useEffect(() => {
    if (matches.length !== 1) {
      setUserClosedDrawer(false);
    }
  }, [matches.length]);

  const handleQueryChange = (event) => {
    setQuery(event.target.value);
    setSelectedFromTable(null);
    setUserClosedDrawer(false);
  };

  const handleRowClick = (person) => {
    setSelectedFromTable(person);
    setUserClosedDrawer(false);
  };

  const handleRowKeyDown = (event, person) => {
    if (event.key === "Enter" || event.key === " ") {
      event.preventDefault();
      handleRowClick(person);
    }
  };

  const handleDrawerClose = () => {
    setUserClosedDrawer(true);
    setSelectedFromTable(null);
  };

  const handleClearQuery = () => {
    setQuery("");
    setSelectedFromTable(null);
    setUserClosedDrawer(false);
  };

  const showNoMatches = query.trim().length > 0 && matches.length === 0;
  const showTable = matches.length > 1;

  return (
    <Stack spacing={2} alignItems="stretch">
      <Box sx={{ textAlign: "center" }}>
        <Typography variant="h5" component="h2" fontWeight={600}>
          Find your seat
        </Typography>
        <Typography variant="body2" color="text.secondary" sx={{ mt: 1, maxWidth: 440, mx: "auto" }}>
          Type your name. We match similar names in the guest list (substring, not case
          sensitive).
        </Typography>
      </Box>

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
        <Typography variant="body2" color="text.secondary" textAlign="center">
          No matches for that search.
        </Typography>
      )}

      {showTable && (
        <Box sx={{ textAlign: "center" }}>
          <Typography
            id="similar-names-heading"
            variant="subtitle1"
            fontWeight={600}
            gutterBottom
            sx={{ maxWidth: 520, mx: "auto" }}
          >
            Similar names — tap a row, or focus a row and press Enter or Space to see your seat
          </Typography>
          {isNarrow ? (
            <Stack spacing={1.5} sx={{ mt: 1, textAlign: "left" }} aria-labelledby="similar-names-heading">
              {matches.map((person) => (
                <Card
                  key={person.id}
                  component="div"
                  role="button"
                  tabIndex={0}
                  variant="outlined"
                  aria-label={`Show seating for ${person.fullName}`}
                  sx={(t) => ({
                    cursor: "pointer",
                    transition: t.transitions.create(["box-shadow", "border-color"], {
                      duration: t.transitions.duration.shorter,
                    }),
                    "&:focus-visible": {
                      outline: `2px solid ${t.palette.primary.main}`,
                      outlineOffset: 2,
                    },
                  })}
                  onClick={() => handleRowClick(person)}
                  onKeyDown={(event) => handleRowKeyDown(event, person)}
                >
                  <CardContent sx={{ py: 2, "&:last-child": { pb: 2 } }}>
                    <Typography variant="subtitle1" fontWeight={700} gutterBottom>
                      {person.fullName}
                    </Typography>
                    <Typography variant="body2" color="text.secondary" component="p">
                      {person.seatingLocation}
                    </Typography>
                  </CardContent>
                </Card>
              ))}
            </Stack>
          ) : (
            <TableContainer
              component={Paper}
              variant="outlined"
              sx={{ maxHeight: { xs: 360, sm: 420 }, mt: 1 }}
            >
              <Table
                stickyHeader
                size="medium"
                aria-labelledby="similar-names-heading"
              >
                <TableHead>
                  <TableRow>
                    <TableCell
                      sx={{
                        typography: "subtitle1",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        py: 2,
                        minHeight: 48,
                      }}
                    >
                      Full name
                    </TableCell>
                    <TableCell
                      sx={{
                        typography: "subtitle1",
                        fontWeight: 700,
                        fontSize: "1.05rem",
                        py: 2,
                        minHeight: 48,
                      }}
                    >
                      Seating location
                    </TableCell>
                  </TableRow>
                </TableHead>
                <TableBody>
                  {matches.map((person) => (
                    <TableRow
                      key={person.id}
                      hover
                      tabIndex={0}
                      aria-label={`Show seating for ${person.fullName}`}
                      sx={(t) => ({
                        cursor: "pointer",
                        "&:focus-visible": {
                          outline: `2px solid ${t.palette.primary.main}`,
                          outlineOffset: -2,
                        },
                      })}
                      onClick={() => handleRowClick(person)}
                      onKeyDown={(event) => handleRowKeyDown(event, person)}
                    >
                      <TableCell
                        sx={{
                          typography: "body1",
                          fontSize: "1.0625rem",
                          lineHeight: 1.45,
                          py: 2,
                          minHeight: 52,
                        }}
                      >
                        {person.fullName}
                      </TableCell>
                      <TableCell
                        sx={{
                          typography: "body1",
                          fontSize: "1.0625rem",
                          lineHeight: 1.45,
                          py: 2,
                          minHeight: 52,
                        }}
                      >
                        {person.seatingLocation}
                      </TableCell>
                    </TableRow>
                  ))}
                </TableBody>
              </Table>
            </TableContainer>
          )}
        </Box>
      )}

      <SwipeableDrawer
        anchor="bottom"
        open={drawerOpen}
        onClose={handleDrawerClose}
        onOpen={() => {}}
        disableSwipeToOpen
        ModalProps={{ keepMounted: true }}
        slotProps={{
          backdrop: {
            sx: {
              backgroundColor: (theme) => alpha(theme.palette.common.black, 0.38),
              backdropFilter: "blur(8px)",
              WebkitBackdropFilter: "blur(8px)",
            },
          },
        }}
        PaperProps={{
          sx: (theme) => ({
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
            bgcolor: alpha(theme.palette.background.paper, 0.76),
            backdropFilter: "blur(20px)",
            WebkitBackdropFilter: "blur(20px)",
            backgroundImage: `linear-gradient(165deg, ${alpha(theme.palette.primary.main, 0.12)} 0%, transparent 42%), linear-gradient(180deg, ${alpha(theme.palette.background.paper, 0.5)} 0%, ${alpha(theme.palette.background.default, 0.35)} 100%)`,
            borderTop: `1px solid ${alpha(theme.palette.primary.main, 0.22)}`,
            boxShadow: `0 -8px 40px ${alpha(theme.palette.common.black, 0.45)}`,
          }),
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
        {resolvedPerson && (
          <motion.div
            key={resolvedPerson.id}
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
              textAlign: "center",
            }}
          >
            <motion.div variants={drawerItemVariants}>
              <Typography variant="overline" color="text.secondary" letterSpacing={1.2}>
                Welcome
              </Typography>
            </motion.div>

            <motion.div variants={drawerItemVariants}>
              <Stack
                direction={{ xs: "column", sm: "row" }}
                spacing={2}
                alignItems="center"
                justifyContent="center"
                sx={{ py: 0.5 }}
              >
                <Avatar
                  sx={{
                    width: 72,
                    height: 72,
                    fontSize: "1.75rem",
                    fontWeight: 700,
                    bgcolor: (t) => alpha(t.palette.primary.main, 0.2),
                    color: "primary.main",
                  }}
                  aria-hidden
                >
                  {nameInitial(resolvedPerson.fullName)}
                </Avatar>
                <Typography variant="h4" component="p" fontWeight={800} sx={{ lineHeight: 1.2 }}>
                  {resolvedPerson.fullName}
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
                  bgcolor: (t) => alpha(t.palette.background.paper, 0.72),
                  backdropFilter: "blur(12px)",
                  WebkitBackdropFilter: "blur(12px)",
                  borderColor: (t) => alpha(t.palette.primary.main, 0.28),
                  boxShadow: (t) => `0 4px 24px ${alpha(t.palette.common.black, 0.2)}, inset 0 1px 0 ${alpha(t.palette.common.white, 0.06)}`,
                }}
              >
                <CardContent sx={{ "&:last-child": { pb: 2 } }}>
                  <Stack
                    direction={{ xs: "column", sm: "row" }}
                    spacing={1.5}
                    alignItems={{ xs: "center", sm: "flex-start" }}
                    justifyContent={{ xs: "center", sm: "flex-start" }}
                  >
                    <EventSeatRoundedIcon color="primary" sx={{ mt: { xs: 0, sm: 0.25 } }} aria-hidden />
                    <Box sx={{ textAlign: { xs: "center", sm: "left" } }}>
                      <Typography variant="caption" color="text.secondary" display="block" gutterBottom>
                        Seating location
                      </Typography>
                      <Typography
                        variant="h6"
                        component="p"
                        fontWeight={700}
                        sx={{ lineHeight: 1.35, fontSize: { xs: "1.35rem", sm: undefined } }}
                      >
                        {resolvedPerson.seatingLocation}
                      </Typography>
                    </Box>
                  </Stack>
                </CardContent>
              </Card>
            </motion.div>

            {(resolvedPerson.department ||
              resolvedPerson.role ||
              resolvedPerson.title) && (
              <motion.div variants={drawerItemVariants}>
                <Typography variant="body2" color="text.secondary" sx={{ pt: 0.5, textAlign: "center" }}>
                  {[resolvedPerson.department, resolvedPerson.role ?? resolvedPerson.title]
                    .filter(Boolean)
                    .join(" · ")}
                </Typography>
              </motion.div>
            )}
          </motion.div>
        )}
      </SwipeableDrawer>

      <Typography variant="body2" textAlign="center" sx={{ pt: 0.5 }}>
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

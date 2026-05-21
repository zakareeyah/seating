import { createContext, useContext, useEffect, useMemo, useState } from "react";
import { useSearchParams } from "react-router-dom";
import { guestDataIsEncrypted, rawGuests } from "../data/guests.js";
import {
  decryptGuestData,
  isGuestArray,
  normalizeGuestList,
} from "../utils/guestCrypto.js";

const GuestDataContext = createContext(null);

export function GuestProvider({ children }) {
  const [searchParams] = useSearchParams();
  const password = searchParams.get("id") ?? "";
  const [status, setStatus] = useState("loading");
  const [guestList, setGuestList] = useState([]);

  useEffect(() => {
    let cancelled = false;

    async function loadGuests() {
      if (!guestDataIsEncrypted) {
        if (!isGuestArray(rawGuests)) {
          if (!cancelled) {
            setGuestList([]);
            setStatus("locked");
          }
          return;
        }
        if (!cancelled) {
          setGuestList(normalizeGuestList(rawGuests));
          setStatus("ready");
        }
        return;
      }

      if (!password) {
        if (!cancelled) {
          setGuestList([]);
          setStatus("locked");
        }
        return;
      }

      try {
        const decrypted = await decryptGuestData(rawGuests, password);
        if (!cancelled) {
          setGuestList(normalizeGuestList(decrypted));
          setStatus("ready");
        }
      } catch {
        if (!cancelled) {
          setGuestList([]);
          setStatus("invalid_password");
        }
      }
    }

    setStatus("loading");
    loadGuests();

    return () => {
      cancelled = true;
    };
  }, [password]);

  const value = useMemo(
    () => ({
      status,
      guestList,
      isSearchEnabled: status === "ready",
    }),
    [status, guestList],
  );

  return (
    <GuestDataContext.Provider value={value}>{children}</GuestDataContext.Provider>
  );
}

export function useGuestList() {
  const context = useContext(GuestDataContext);
  if (!context) {
    throw new Error("useGuestList must be used within GuestProvider");
  }
  return context;
}

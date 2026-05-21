import rawGuestData from "./guests.json";
import { isEncryptedGuestEnvelope } from "../utils/guestCrypto.js";

export const rawGuests = rawGuestData;
export const guestDataIsEncrypted = isEncryptedGuestEnvelope(rawGuestData);

import rawGuests from "./guests.json";

export const GUEST_LIST = rawGuests.map((guest, i) => ({
  id: `g-${String(i + 1).padStart(3, "0")}`,
  fullName: guest.fullName,
  tableNumber: guest.tableNumber,
}));

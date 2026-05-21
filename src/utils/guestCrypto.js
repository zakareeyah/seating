const PBKDF2_ITERATIONS = 250000;
const SALT_BYTES = 16;
const IV_BYTES = 12;

function bytesToBase64(bytes) {
  const bin = Array.from(bytes, (b) => String.fromCharCode(b)).join("");
  return btoa(bin);
}

function base64ToBytes(base64) {
  const bin = atob(base64);
  const bytes = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i += 1) {
    bytes[i] = bin.charCodeAt(i);
  }
  return bytes;
}

async function deriveKey(password, salt) {
  const enc = new TextEncoder();
  const keyMaterial = await crypto.subtle.importKey(
    "raw",
    enc.encode(password),
    "PBKDF2",
    false,
    ["deriveKey"],
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt,
      iterations: PBKDF2_ITERATIONS,
      hash: "SHA-256",
    },
    keyMaterial,
    { name: "AES-GCM", length: 256 },
    false,
    ["encrypt", "decrypt"],
  );
}

export function isEncryptedGuestEnvelope(data) {
  return (
    data &&
    typeof data === "object" &&
    !Array.isArray(data) &&
    data.v === 1 &&
    data.cipher === "AES-GCM" &&
    typeof data.salt === "string" &&
    typeof data.iv === "string" &&
    typeof data.ciphertext === "string"
  );
}

export function isGuestArray(data) {
  return (
    Array.isArray(data) &&
    data.every(
      (item) =>
        item &&
        typeof item === "object" &&
        typeof item.fullName === "string" &&
        typeof item.tableNumber === "number",
    )
  );
}

export function normalizeGuestList(rawGuests) {
  return rawGuests.map((guest, i) => ({
    id: `g-${String(i + 1).padStart(3, "0")}`,
    fullName: guest.fullName,
    tableNumber: guest.tableNumber,
  }));
}

export async function encryptGuestData(guests, password) {
  if (!isGuestArray(guests)) {
    throw new Error("Invalid guest list format");
  }
  if (!password) {
    throw new Error("Password is required");
  }

  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const iv = crypto.getRandomValues(new Uint8Array(IV_BYTES));
  const key = await deriveKey(password, salt);
  const enc = new TextEncoder();
  const ciphertext = await crypto.subtle.encrypt(
    { name: "AES-GCM", iv },
    key,
    enc.encode(JSON.stringify(guests)),
  );

  return {
    v: 1,
    kdf: { name: "PBKDF2", iterations: PBKDF2_ITERATIONS, hash: "SHA-256" },
    cipher: "AES-GCM",
    salt: bytesToBase64(salt),
    iv: bytesToBase64(iv),
    ciphertext: bytesToBase64(new Uint8Array(ciphertext)),
  };
}

export async function decryptGuestData(envelope, password) {
  if (!isEncryptedGuestEnvelope(envelope)) {
    throw new Error("Invalid encrypted guest envelope");
  }
  if (!password) {
    throw new Error("Password is required");
  }

  const salt = base64ToBytes(envelope.salt);
  const iv = base64ToBytes(envelope.iv);
  const ciphertext = base64ToBytes(envelope.ciphertext);
  const key = await deriveKey(password, salt);

  let plaintext;
  try {
    plaintext = await crypto.subtle.decrypt(
      { name: "AES-GCM", iv },
      key,
      ciphertext,
    );
  } catch {
    throw new Error("Decryption failed");
  }

  const guests = JSON.parse(new TextDecoder().decode(plaintext));
  if (!isGuestArray(guests)) {
    throw new Error("Decrypted data is not a valid guest list");
  }
  return guests;
}

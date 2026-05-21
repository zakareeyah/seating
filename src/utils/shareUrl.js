export function buildShareUrl({ pathname, password, includePassword }) {
  const origin = window.location.origin;
  const base = import.meta.env.BASE_URL;
  const hashRoute = pathname === "/" ? "#/" : `#${pathname}`;
  const query =
    includePassword && password
      ? `?id=${encodeURIComponent(password)}`
      : "";
  return `${origin}${base}${hashRoute}${query}`;
}

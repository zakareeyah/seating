/**
 * @param {Array<{ fullName: string }>} people
 * @param {string} query
 * @returns {typeof people}
 */
export function filterPeopleByNameQuery(people, query) {
  const q = query.trim().toLowerCase();
  if (!q) return [];
  return people.filter((p) => p.fullName.toLowerCase().includes(q));
}

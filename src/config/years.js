export const years = Array.from(
  { length: 51 },
  (_, i) => new Date().getFullYear() - i
).map(year => ({ name: year, value: String(year) }));
years.unshift({ name: 'No year', value: null });

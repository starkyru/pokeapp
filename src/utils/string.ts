export function capitalizeFirstLetter(s: string) {
  return s.charAt(0).toUpperCase() + s.slice(1);
}

export function formatName(s: string) {
  return capitalizeFirstLetter(s.replace('-', ' '));
}

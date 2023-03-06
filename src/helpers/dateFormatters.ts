// returns an ISO8601 formatted date string, in accordance with Strapi's working model
export function formatToISO8601(dateString: string): string {
  const parts = dateString.split(' ');
  const dateParts = parts[0].split('/');
  const timeParts = parts[1].split(':');
  const year = parseInt(dateParts[2]);
  const month = parseInt(dateParts[1]) - 1;
  const day = parseInt(dateParts[0]);
  const hours = parseInt(timeParts[0]);
  const minutes = parseInt(timeParts[1]);
  const date = new Date(Date.UTC(year, month, day, hours, minutes));
  return date.toISOString();
}

// returns a human readable European date formatted string for easier user experience
export function formatDate(isoDateString: string): string {
  const date = new Date(isoDateString);
  const day = date.getUTCDate().toString().padStart(2, '0');
  const month = (date.getUTCMonth() + 1).toString().padStart(2, '0');
  const year = date.getUTCFullYear().toString();
  const hours = date.getUTCHours().toString().padStart(2, '0');
  const minutes = date.getUTCMinutes().toString().padStart(2, '0');
  return `${day}/${month}/${year} ${hours}:${minutes}`;
}

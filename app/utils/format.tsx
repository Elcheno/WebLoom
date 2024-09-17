
export function truncateText(text: string, maxLength: number) {
  if (!text) return '';
  if (text.length <= maxLength) {
    return text;
  }
  return text.substring(0, maxLength) + '...';
}

export function formatUrl(url: string) {
  return url.replace('https://', '').replace('http://', '').replace('www.', '');
}

export function formatDate(date: string | Date) {  
  return new Date(date).toISOString().split('T')[0];
}

export function formatFavicon(url: string) {
  return `${url}/favicon.ico`;
}

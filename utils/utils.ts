
export function formatName(name: string) {
  return name.replace(/ /g, '_');
}

export function unFormatName(name: string) {  
  return name.replace(/_/g, ' ');
}

export function formatDate(date: string) {
  return new Date(date).toLocaleDateString();
}

export function formatVisibility(visibility: string) {
  return visibility === 'public' ? 'Public' : 'Private';
}
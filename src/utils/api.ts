const API_KEY = 'b4574629'; //import.meta.env.VITE_OMDB_API_KEY;
const baseUrl = 'http://www.omdbapi.com/';

export async function fetchJson(url: string): Promise<any> {
  const response = await fetch(url);
  return await response.json();
}

export function buildSearchUrl(searchQuery: string, page: number = 1): string {
  return `${baseUrl}?apikey=${API_KEY}&type=movie&s=${encodeURIComponent(
    searchQuery
  )}&page=${page}`;
}

export function buildDetailsUrl(id: string): string {
  return `${baseUrl}?apikey=${API_KEY}&i=${id}&plot=full`;
}

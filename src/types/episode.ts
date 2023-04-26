export type Episode = {
  id: number;
  name: string;
  air_date: string;
  episode: string;
  characters?: (null)[] | null;
  url: string;
  created: string;
}

export type Page = {
  info: {
    count: number;
    next: string | null;
    pages: number;
    prev: string | null;
  }
  results: Episode[]
}
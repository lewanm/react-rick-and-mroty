export type Info = {
  pages: number,
  next: string,
  prev: string
};

type Results = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  episode: string[];
};

export type Character = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  episode: string[];
};
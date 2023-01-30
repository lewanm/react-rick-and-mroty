export type Info = {
  pages: number,
  next: string,
  prev: string,
  count: number
};

type Results = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  episode: string[];
};

type Location ={
  name: string
  url: string
}

type Origin ={
  name: string
  url: string
}

export type Character = {
  id: number;
  image: string;
  name: string;
  status: string;
  species: string;
  episode: string[];
  location: Location;
  origin: Origin
  gender: string
  type: string
};
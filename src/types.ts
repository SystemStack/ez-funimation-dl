export interface UserCredential {
  username: string;
  password: string;
}

export interface IdSearchQuery {
  title: string;
}

export interface IdSearchResult {
  title: string;
  ratings: string;
  description: string;
  starRating: number;
  slug: string;
  synopsis: string;
  quality: [Object];
  id: string;
  txDate: number;
  image: [Object];
  languages: string[];
}

export interface CatalogSearchQuery {
  animeId: string;
}

interface ShowParent {
  thumb: string;
  title: string;
  poster: string;
  slug: string;
  synopsis: string;
  type: string;
  banner: string;
  id: number;
}
export interface Show {
  title: string;
  number: string;
  externalItemId: string;
  id: number;
  mediaCategory: "season" | "extras" | "movie" | unknown;
  order: number;
  parent: ShowParent;
}

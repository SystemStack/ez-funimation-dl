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

export interface EpisodeSearchQuery {
  animeId: string;
}

export interface EpisodeSearchResult {

}

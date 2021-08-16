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
  quality: [unknown];
  id: string;
  txDate: number;
  image: [unknown];
  languages: string[];
}

export interface CatalogSearchQuery {
  animeId: string;
}

export interface ShowParent {
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

export interface UserPreferences {
  AudioPreference: "Japanese" | "English";
  SubtitlePreference:
    | "None"
    | "English"
    | "Japanese"
    | "Spanish"
    | "Portuguese";
  QualityPreference: number;
}

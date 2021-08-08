import prompts, { PromptObject } from "prompts";
import { QueryCatalog, QueryIds } from "./service";
import {
  CatalogSearchQuery,
  IdSearchQuery,
  IdSearchResult,
  Show,
} from "./types";

async function _idSearch(): Promise<IdSearchResult[]> {
  const questions: PromptObject[] = [
    {
      type: "text",
      name: "title",
      message: "Search Funimation🔎",
    },
  ];
  const answer = <IdSearchQuery>await prompts(questions);
  return QueryIds(answer);
}
export async function IdSearch(): Promise<IdSearchResult[]> {
  let result: IdSearchResult[] = [];
  while (result.length === 0) {
    result = await _idSearch();
    if (result.length === 0) {
      console.warn("No results");
    }
  }
  return result;
}

async function _catalogSearch(query: CatalogSearchQuery): Promise<Show[]> {
  return await QueryCatalog(query);
}
export async function CatalogSearch(animeId: string): Promise<Show[]> {
  return await _catalogSearch({ animeId });
}

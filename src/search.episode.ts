import prompts, { PromptObject } from "prompts";
import { QueryEpisodes } from "./service";
import { EpisodeSearchQuery, EpisodeSearchResult } from "./types";

async function _episodeSearch(query: EpisodeSearchQuery): Promise<EpisodeSearchResult[]> {
  return await QueryEpisodes(query);
}
export async function EpisodeSearch(animeId: string): Promise<EpisodeSearchResult[]> {
  return await _episodeSearch({animeId});
}

async function _episodeSelect(episodes: EpisodeSearchResult[]): Promise<EpisodeSearchResult> {
  const question: PromptObject = {
    type: 'autocomplete',
    name: 'episodeString',
    message: 'Select a range of episodes (WIP)',
    // suggest: //TODO
    // onState: //TODO,
  };
  let result = await prompts(question);
  return result.animeId;
}
export async function EpisodeSelect(episodes: EpisodeSearchResult[]): Promise<EpisodeSearchResult> {
  return await _episodeSelect(episodes);
}


import prompts, { PromptObject } from "prompts";
import { CatalogSearch, IdSearch } from "./search";
import { IdSearchResult, Show } from "./types";
const run = async () => {
  while (true) {
    let idSearchResult = await IdSearch();
    let animeId = await IdSelect(idSearchResult);
    console.log(animeId);

    let episodeResult = await CatalogSearch(animeId);
    console.log(episodeResult);
    let episodesToDownload = await EpisodeSelect(episodeResult);
    console.log(episodesToDownload);
  }
};
run();

async function IdSelect(ids: IdSearchResult[]): Promise<string> {
  const question: PromptObject = {
    type: "autocomplete",
    name: "animeId",
    message: "Which one is right? (autocomplete or arrow keys)",
    choices: ids.map((e) => {
      return {
        title: e.title,
        description: e.description,
        value: e.id,
      };
    }),
  };
  let result = await prompts(question);
  return result.animeId;
}

async function EpisodeSelect(episodes: Show[]): Promise<Show[]> {
  const question: PromptObject = {
    type: "multiselect",
    name: "Seasons",
    message: "Select seasons",
    choices: episodes.map((e) => {
      return {
        title: e.title,
        description: e.parent.synopsis,
        value: e,
      };
    }),
  };
  let result = await prompts(question);
  for (let i = 0; i < result.Seasons.length; i++) {
    console.log(JSON.stringify(result.Seasons[i].ids));
  }
  return result.animeId;
}

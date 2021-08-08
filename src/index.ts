import prompts, { PromptObject } from "prompts";
import { GetEpisodeUrls } from "./episode.service";
import { CatalogSearch, IdSearch } from "./search";
import { IdSearchResult, Show } from "./types";
(async () => {
  for (;;) {
    const idSearchResult = await IdSearch();
    const animeId = await IdSelect(idSearchResult);
    const episodeResult = await CatalogSearch(animeId);
    const seasonsToDownload = await SeasonSelect(episodeResult);
    const m3u8DownloadUrls = await GetEpisodeUrls(seasonsToDownload);
    console.log(m3u8DownloadUrls);
  }
})();

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
  const result = await prompts(question);
  return result.animeId;
}

async function SeasonSelect(episodes: Show[]): Promise<Show[]> {
  let result: Show[] = [];
  while (result.length === 0) {
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
    const response = await prompts(question);
    result = response.Seasons;
    if (result.length === 0) {
      console.warn(
        " ~~~~~~~~~~~~~~~~~~~~~~SPACE BAR TO SELECT~~~~~~~~~~~~~~~~~~~~~~\n",
        "~~~~~~~~~~~~~~~~~~~~~~SPACE BAR TO SELECT~~~~~~~~~~~~~~~~~~~~~~\n",
        "~~~~~~~~~~~~~~~~~~~~~~SPACE BAR TO SELECT~~~~~~~~~~~~~~~~~~~~~~"
      );
    }
  }
  return result;
}

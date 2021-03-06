import prompts, { PromptObject } from "prompts";
import { DownloadVideos } from "./download.service";
import { GetEpisodeUrls } from "./episode.service";
import { CatalogSearch, IdSearch } from "./search";
import { IdSearchResult, Show } from "./types";
import { GetUserSettings } from "./user";

(async () => {
  const UserPreferences = await GetUserSettings();
  console.table(UserPreferences);
  for (;;) {
    const idSearchResult = await IdSearch();
    const animeId = await IdSelect(idSearchResult);
    const seasonResult = await CatalogSearch(animeId);
    const seasonsToDownload = await SeasonSelect(seasonResult);
    const episodeResults = await GetEpisodeUrls(
      seasonsToDownload,
      UserPreferences.AudioPreference
    );
    if (UserPreferences.BackgroundPreference) {
      console.log(
        `DOWNLOADING ${episodeResults.length} episodes into Videos in the background`
      );
      const result = DownloadVideos(episodeResults);
    } else {
      console.log(`DOWNLOADING ${episodeResults.length} episodes please wait`);
      const result = await DownloadVideos(episodeResults);
    }
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

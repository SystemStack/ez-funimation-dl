const fetch = require("node-fetch");
import { GetAuthHeader } from "./access";
import {
  downloadAPIRoute,
  episodeCatalogRoute,
  episodeSeasonRoute,
  userAgent,
} from "./config";
import { Show } from "./types";

async function _getEpisodesCatalogUrls(
  seasonIds: Set<number>,
  parentId: number,
  language: string
): Promise<string[]> {
  const authHeader = await GetAuthHeader();
  return fetch(
    `${episodeSeasonRoute}\
?sort=order\
&sort_direction=ASC\
&limit=-1\
&offset=-1\
&language=${language}\
&title_id=${parentId}`,
    {
      method: "GET",
      proxy: true,
      headers: {
        "user-agent": userAgent,
        Authorization: authHeader,
      },
    }
  )
    .then((res) => res.json())
    .then((res) => {
      return [
        ...new Set(
          res.items
            .flatMap((e: any) => {
              if (seasonIds.has(e.item.seasonId)) {
                return `${episodeCatalogRoute}${e.item.titleSlug}/${e.item.episodeSlug}/`;
              }
            })
            .filter((e: string | undefined) => e != undefined)
        ),
      ];
    });
}

// todo, too arcane for anyone else to participate here
export async function GetEpisodeUrls(
  query: Show[],
  language = "English"
): Promise<string[]> {
  const authHeader = await GetAuthHeader();
  const seasonIds = new Set(query.flatMap((e) => e.id));
  const episodesList = await _getEpisodesCatalogUrls(
    seasonIds,
    query[0].parent.id,
    language
  );

  const result = await Promise.all(
    episodesList.map(async (url: string) => {
      return await _getEpisodeUrls(url, language, authHeader);
    })
  );
  return result.filter((e: string | undefined) => e !== undefined);
}

async function _getEpisodeUrls(
  url: string,
  language: string,
  authHeader: string
): Promise<string> {
  return fetch(url, {
    method: "GET",
    proxy: true,
    headers: {
      "user-agent": userAgent,
      Authorization: authHeader,
    },
  })
    .then((res) => res.json())
    .then((res: any): string | void => {
      for (const e of res.items[0].media[0].mediaChildren) {
        if (e.ext === "m3u8" && e.language === language) {
          return `${downloadAPIRoute}${
            e.filePath.split("FunimationStoreFront/")[1]
          }`;
        }
      }
    })
    .catch((err: unknown) => err);
}

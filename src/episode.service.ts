/* eslint-disable max-len */
const fetch = require("node-fetch");
import { GetAuthHeader } from "./access";
import {
  episodeCatalogRoute,
  episodeSeasonRoute,
  SOURCE_API,
  userAgent,
} from "./config";
import { IEpisodeResult, Show } from "./types";
async function _getEpisodesCatalogUrls(
  seasonIds: Set<number>,
  parentId: number,
  language: string
): Promise<IEpisodeResult[]> {
  const authHeader = await GetAuthHeader();
  return fetch(
    `${episodeSeasonRoute}?sort=order&sort_direction=ASC&limit=-1&offset=-1&language=${language}&title_id=${parentId}`,
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
      return res.items
        .map((e) => {
          if (seasonIds.has(e.item.seasonId)) {
            return {
              url: `${episodeCatalogRoute}${e.item.titleSlug}/${e.item.episodeSlug}/`,
              titleName: e.item.titleName,
              seasonNum: e.item.seasonNum,
              episodeName: e.item.episodeName,
              episodeOrder: e.item.episodeOrder,
            };
          }
        })
        .filter((e: IEpisodeResult) => e != undefined && e.url != undefined);
    });
}

export async function GetEpisodeUrls(
  query: Show[],
  language: string
): Promise<IEpisodeResult[]> {
  const authHeader = await GetAuthHeader();
  const seasonIds = new Set(query.flatMap((e) => e.id));
  const episodesList = await _getEpisodesCatalogUrls(
    seasonIds,
    query[0].parent.id,
    language
  );

  const result = await Promise.all(
    episodesList.map(async (obj: IEpisodeResult) => {
      return {
        ...obj,
        url: await _getEpisodeUrls(obj.url, language, authHeader),
      };
    })
  );

  return result.filter(
    (e: IEpisodeResult) => e != undefined && e.url != undefined
  );
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
    .then(async (res): Promise<string | void> => {
      // Then get mp4 Url from catalog...
      for (const e of res.items[0].media[0].mediaChildren) {
        if (e.ext === "mp4" && e.language === language) {
          return await fetch(
            `${SOURCE_API}source/catalog/video/${e.parent.id}/signed`,
            {
              method: "GET",
              proxy: true,
              headers: {
                "user-agent": userAgent,
                Authorization: authHeader,
                devicetype: "Android",
              },
            }
          )
            .then((res) => res.json())
            .then((res) => {
              return res.items.filter((e) => e.videoType === "mp4")[0].src;
            });
        }
      }
    })
    .catch((err: unknown) => err);
}

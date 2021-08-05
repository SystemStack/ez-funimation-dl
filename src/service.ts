import { GetAccessToken } from "./access";
import { SOURCE_API, userAgent } from "./config";
import {
  CatalogSearchQuery,
  IdSearchQuery,
  IdSearchResult,
  Show,
  UserCredential,
} from "./types";

const fetch = require("node-fetch");
const loginRoute = `${SOURCE_API}auth/login/`;
const historyRoute = `${SOURCE_API}source/funimation/history/`; //todo could be fun
const idSearchRoute = `${SOURCE_API}source/funimation/search/?q=`;
const catalogSearchRoute = `${SOURCE_API}source/catalog/title/`;

export async function Login(creds: UserCredential): Promise<string> {
  return fetch(`${SOURCE_API}${loginRoute}`, {
    method: "POST",
    body: JSON.stringify(creds),
    headers: {
      "user-agent": userAgent,
    },
    proxy: true,
  })
    .then(function (res: any) {
      return res.json();
    })
    .then(function (json: any) {
      return json.token;
    })
    .catch(function (err: any) {
      return err;
    });
}

export async function QueryIds(
  query: IdSearchQuery
): Promise<IdSearchResult[]> {
  let authHeader = _getAuthHeader();
  return fetch(`${idSearchRoute}${query.title}`, {
    method: "GET",
    proxy: true,
    headers: {
      "user-agent": userAgent,
      Authorization: authHeader,
    },
  })
    .then(function (res: any) {
      return res.json();
    })
    .then(function (json: any) {
      return json.items.hits;
    })
    .catch(function (err: any) {
      return err;
    });
}

export async function QueryCatalog(query: CatalogSearchQuery): Promise<Show[]> {
  let authHeader = _getAuthHeader();
  return fetch(`${catalogSearchRoute}${query.animeId}/`, {
    method: "GET",
    proxy: true,
    headers: {
      "user-agent": userAgent,
      Authorization: authHeader,
    },
  })
    .then((res: any) => res.json())
    .then((json: any) => json.items[0])
    .then((seasons: any): Show[] =>
      seasons.children.filter((e: any) => e.mediaCategory === "season")
    )
    .catch((err: any) => err);
}

async function _getAuthHeader(): Promise<string> {
  let token = await GetAccessToken();
  return `Token ${token}`;
}

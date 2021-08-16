const fetch = require("node-fetch");
import { GetAuthHeader } from "./access";
import {
  catalogSearchRoute,
  idSearchRoute,
  loginRoute,
  userAgent,
} from "./config";
import {
  CatalogSearchQuery,
  IdSearchQuery,
  IdSearchResult,
  Show,
  UserCredential,
} from "./types";

export async function Login(creds: UserCredential): Promise<string> {
  return await fetch(loginRoute, {
    method: "POST",
    body: JSON.stringify(creds),
    headers: {
      "user-agent": userAgent,
    },
    proxy: true,
  })
    .then((res) => res.json())
    .then((res) => res.token)
    .catch((err: unknown) => err);
}

export async function QueryIds(
  query: IdSearchQuery
): Promise<IdSearchResult[]> {
  const authHeader = await GetAuthHeader();
  return await fetch(`${idSearchRoute}${query.title}`, {
    method: "GET",
    proxy: true,
    headers: {
      "user-agent": userAgent,
      Authorization: authHeader,
    },
  })
    .then((res) => res.json())
    .then((json) => json?.items?.hits)
    .catch((err: unknown) => err);
}

export async function QueryCatalog(query: CatalogSearchQuery): Promise<Show[]> {
  const authHeader = await GetAuthHeader();
  return await fetch(`${catalogSearchRoute}${query.animeId}/`, {
    method: "GET",
    proxy: true,
    headers: {
      "user-agent": userAgent,
      Authorization: authHeader,
    },
  })
    .then((res) => res.json())
    .then((json) => json?.items[0])
    .then((seasons: any): Show[] =>
      seasons.children.filter((e: any) => e.mediaCategory === "season")
    )
    .catch((err: unknown) => err);
}

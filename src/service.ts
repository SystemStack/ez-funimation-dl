import { userAgent, SOURCE_API } from './config';
import { UserCredential, IdSearchQuery, IdSearchResult, EpisodeSearchQuery } from './types';
import { GetAccessToken } from './access';

const fetch = require('node-fetch');

const loginRoute = 'auth/login/';
const historyRoute = 'source/funimation/history/'
export async function Login(creds: UserCredential): Promise<string> {
  return fetch(`${SOURCE_API}auth/login/`,
    {
      method: 'POST',
      body: JSON.stringify(creds),
      headers: { 'user-agent': userAgent },
      proxy: true
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

export async function QueryIds(query: IdSearchQuery) : Promise<IdSearchResult[]> {
  let authHeader = GetAuthHeader();
  return fetch(`${SOURCE_API}source/funimation/search/?q=${query.title}`, {
    method: 'GET',
    proxy: true,
    headers: { 
      'user-agent': userAgent,
      'Authorization': GetAuthHeader()
    },
  }).then(function (res: any) {
    return res.json();
  }).then(function (json: any) {
    return json.items.hits;
  }).catch(function (err: any) {
    return err;
  });
}

export async function QueryEpisodes(query: EpisodeSearchQuery) : Promise<any[]> {
  let authHeader = GetAuthHeader();
  return fetch(`${SOURCE_API}source/catalog/title/?${query.animeId}`, {
    method: 'GET',
    proxy: true,
    headers: { 
      'user-agent': userAgent,
      'Authorization': authHeader
    },
  }).then(function (res: any) {
    return res.json();
  }).then(function (json: any) {
    return json.items.hits;
  }).catch(function (err: any) {
    return err;
  });
}
async function GetAuthHeader(): Promise<string> {
  let token = await GetAccessToken();
  return `Token ${token}`;
}

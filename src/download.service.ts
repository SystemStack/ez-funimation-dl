// import  from 'm3u8-parser';
const fetch = require("node-fetch");
import { GetAuthHeader } from "./access";
import { userAgent } from "./config";
const tempDir = ".temp";
interface M3U8Selection {
  resolution: string;
  url: string;
  bandwidth: number;
  codecs: string;
}

export async function DownloadM3u8(
  urls: string[],
  quality: number
): Promise<string[]> {
  const result = await Promise.all(
    urls.map(async (url: string) => {
      return await _downloadM3u8(url, quality);
    })
  );
  return result;
}

async function _downloadM3u8(url: string, quality: number) {
  return fetch(url, {})
    .then((res) => res.text())
    .then((res: string): string => {
      const options: string[] = res.split("\n#");
      if (options.shift() !== "#EXTM3U") throw "Malformed m3u file";
      const mappedOptions: M3U8Selection[] = options
        .map((e) => {
          return {
            resolution: e.split("RESOLUTION=")[1].split("\n")[0],
            url: e.split("\n")[1].split("\n")[0],
            bandwidth: Number(e.split("BANDWIDTH=")[1].split(",")[0]),
            codecs: e.split('CODECS="')[1].split('"')[0],
          };
        })
        .sort((a, b) => a.bandwidth - b.bandwidth);
      return mappedOptions[Math.min(quality - 1, mappedOptions.length - 1)].url;
    })
    .catch((err) => err);
}

export async function DownloadTs(urls: string[]): Promise<unknown> {
  const authHeader = await GetAuthHeader();
  const result = await Promise.all(
    urls.map(async (url: string) => {
      return await _downloadTs(url, authHeader);
    })
  );
  return result;
}

async function _downloadTs(urls: string, authHeader: string): Promise<unknown> {
  return fetch(urls[0], {
    method: "GET",
    proxy: true,
    headers: {
      "user-agent": userAgent,
      Authorization: authHeader,
    },
  })
    .then((res) => res.text())
    .then((res) => {
      console.log(res);
    })
    .catch((err) => err);
}

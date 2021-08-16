import fs from "fs";
import https from "https";
import { IEpisodeResult } from "./types";

export async function DownloadVideos(
  urls: IEpisodeResult[]
): Promise<boolean[]> {
  _assertDir("./Videos");
  const result = Promise.all(
    urls.map(async (e: IEpisodeResult) => {
      _assertDir(`./Videos/${e.titleName}`);
      return await _downloadVideos(
        e.url,
        `${e.titleName}/(S${e.seasonNum}-${e.episodeOrder}) ${e.episodeName}`
      );
    })
  );
  return await result;
}
async function _assertDir(dir: string) {
  if (!fs.existsSync(dir)) {
    fs.mkdirSync(dir);
  }
}
async function _downloadVideos(
  url: string,
  filename: string
): Promise<boolean> {
  return new Promise((resolve) => {
    https.get(url, (res) => {
      const filePath = fs.createWriteStream(`./Videos/${filename}.mp4`);
      res.pipe(filePath);
      filePath.on("finish", () => {
        filePath.close();
        console.log(`${filename} finished`);
        resolve(true);
      });
    });
  });
}

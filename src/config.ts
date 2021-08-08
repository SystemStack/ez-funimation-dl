import { ShowParent } from "./types";

export const SOURCE_API = "https://prod-api-funimationnow.dadcdigital.com/api/";
export const downloadAPIRoute =
  "https://vmfst-api.prd.funimationsvc.com/FunimationStoreFront/";
export const episodeAPI =
  "https://d33et77evd9bgg.cloudfront.net/FunimationStoreFront/";
export const s3Bucket =
  "https://d132fumi6di1wa.cloudfront.net/exp/FunimationStoreFront/";
const episodeAPIImageRoute =
  "https://derf9v1xhwwx1.cloudfront.net/image/upload/oth/FunimationStoreFront/";
const a = {
  moz: "Mozilla/5.0 (Windows NT 10.0; Win64; x64)",
  awk: "AppleWebKit/537.36 (KHTML, like Gecko)",
  chr: "Chrome/91.0.4472.114",
  saf: "Safari/537.36",
  edg: "Edg/91.0.864.59",
};
export const userAgent = `${a.moz} ${a.awk} ${a.chr} ${a.saf} ${a.edg}`;
export const loginRoute = `${SOURCE_API}auth/login/`;
export const historyRoute = `${SOURCE_API}source/funimation/history/`;
export const idSearchRoute = `${SOURCE_API}source/funimation/search/?q=`;
export const catalogSearchRoute = `${SOURCE_API}source/catalog/title/`;
export const episodeSeasonRoute = `${SOURCE_API}funimation/episodes/`;
export const episodeCatalogRoute = `${SOURCE_API}source/catalog/episode/`;

type PolicyCondition = {
  DateLessThan: { "AWS:EpochTime": number | string };
};

interface Policy {
  Resource: string;
  Condition: PolicyCondition;
}

interface PolicyParam {
  Statement: Policy[];
}
export const GetShowId = (parent: ShowParent): string => {
  const id = parent.thumb.length
    ? parent.thumb.split(episodeAPIImageRoute)[1].split("/")[0]
    : parent.poster.length
    ? parent.poster.split(episodeAPIImageRoute)[1].split("/")[0]
    : "";

  if (id == "") {
    throw "Could not find download source";
  }
  return id;
};

export const GetPolicyParam = (url: string): string => {
  const result: PolicyParam = {
    Statement: [
      {
        Resource: url,
        Condition: {
          DateLessThan: {
            "AWS:EpochTime": Number(new Date()) - 1626772333000,
          },
        },
      },
    ],
  };
  return Buffer.from(JSON.stringify(result)).toString("base64");
};

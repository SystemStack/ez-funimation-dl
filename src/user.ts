import { access, readFile, writeFile } from "fs/promises";
import prompts, { PromptObject } from "prompts";
import { UserPreferences } from "./types";

const audioOptions = ["English", "Japanese"];
const subtitleOptions = [
  "None",
  "English",
  "Japanese",
  "Spanish",
  "Portuguese",
];
const preferencesFile = "preferences.json";

export async function GetUserSettings(): Promise<UserPreferences> {
  await assertPreferencesFile();
  return await readFile(preferencesFile, "utf8")
    .then(async (value) => {
      let prefs = JSON.parse(value);
      while (!isUserPreferences(prefs)) {
        prefs = await GetPreferences();
        writeFile(preferencesFile, JSON.stringify(prefs));
      }
      return prefs;
    })
    .catch();
}
async function assertPreferencesFile() {
  return access(preferencesFile)
    .then(() => true)
    .catch(() => writeFile(preferencesFile, "{}"));
}
async function GetPreferences(): Promise<UserPreferences> {
  console.table("First Time Setup");
  const questions: PromptObject<string>[] = [
    {
      type: "select",
      name: "AudioPreference",
      message: "Audio Language:",
      choices: audioOptions.map((e) => {
        return { title: e, value: e };
      }),
    },
    {
      type: "select",
      name: "SubtitlePreference",
      message: "Subtitle Language:",
      choices: subtitleOptions.map((e) => {
        return { title: e, value: e };
      }),
    },
    {
      type: "confirm",
      name: "BackgroundPreference",
      message: `Would you like downloads to run in the background?\
(No is easier if you're only downloading one show):`,
      initial: true,
    },
  ];
  const answer = <UserPreferences>await prompts(questions);
  return answer;
}
function isUserPreferences(obj?: UserPreferences): obj is UserPreferences {
  return (
    obj != null &&
    "AudioPreference" in obj &&
    "SubtitlePreference" in obj &&
    "BackgroundPreference" in obj
  );
}

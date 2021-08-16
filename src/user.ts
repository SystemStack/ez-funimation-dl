import { access, readFile, writeFile } from "fs/promises";
import prompts, { PromptObject } from "prompts";
import { UserPreferences } from "./types";

const audioOptions = ["Japanese", "English"];
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
      type: "number",
      name: "QualityPreference",
      message: "Quality (10 is highest, 1 is lowest):",
      initial: 10,
      min: 1,
      max: 10,
      validate: (QualityPreference) =>
        QualityPreference > 10 || QualityPreference < 1
          ? "Pick a number from 1 (lowest) to 10 (highest)"
          : true,
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
    "QualityPreference" in obj
  );
}

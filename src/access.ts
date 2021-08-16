import { access, readFile, writeFile } from "fs/promises";
import prompts, { PromptObject } from "prompts";
import { Login } from "./service";
import { UserCredential } from "./types";

const tokenFile = ".accesstoken";

async function _assertPreferencesFile() {
  return access(tokenFile)
    .then(() => true)
    .catch(() => writeFile(tokenFile, ""));
}

async function _readTokenFile(): Promise<string> {
  return await readFile(tokenFile, "utf8");
}

async function _writeTokenFile(token: string): Promise<void> {
  return await writeFile(tokenFile, token);
}

async function _login(): Promise<string> {
  const questions: PromptObject[] = [
    {
      type: "text",
      name: "username",
      message: "Funimation Username (Never stored)",
    },
    {
      type: "password",
      name: "password",
      message: "Funimation Password (Never stored)",
    },
  ];
  const userCred = <UserCredential>await prompts(questions);
  return Login(userCred);
}

async function _getAccessToken(): Promise<string> {
  await _assertPreferencesFile();
  let token = await _readTokenFile();
  if (token === "") {
    token = await _login();
    await _writeTokenFile(token);
  }
  return token;
}

export async function GetAuthHeader(): Promise<string> {
  const token = await _getAccessToken();
  return `Token ${token}`;
}

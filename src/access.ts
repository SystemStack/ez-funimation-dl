import prompts, { PromptObject } from 'prompts';
import { writeFile, readFile } from 'fs/promises';
import { Login } from './service';
import { UserCredential } from './types';

const tokenFile = '.accesstoken';

async function _readTokenFile(): Promise<string> {
  return await readFile(tokenFile, 'utf8');
}

async function _writeTokenFile(token: string): Promise<void> {
  return await writeFile(tokenFile, token);
}

async function _login(): Promise<string> {
  const questions: PromptObject[] = [{
    type: 'text',
    name: 'username',
    message: 'Funimation Username (Never stored)'
  }, {
    type: 'password',
    name: 'password',
    message: 'Funimation Password (Never stored)'
  }];
  let userCred = <UserCredential>await prompts(questions);
  return Login(userCred);
}

export async function GetAccessToken(): Promise<string> {
  let token = await _readTokenFile();
  if(token === '') {
    token = await _login();
    await _writeTokenFile(token);
  }
  return token;
}

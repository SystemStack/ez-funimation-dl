import prompts, { PromptObject } from "prompts";
import { QueryIds } from "./service";
import { IdSearchQuery, IdSearchResult } from "./types";

async function _idSearch(): Promise<IdSearchResult[]> {
  const questions: PromptObject[] = [{
    type: 'text',
    name: 'title',
    message: 'Search Funimation🔎'
  }];
  let answer = <IdSearchQuery>await prompts(questions);
  return QueryIds(answer);
}
export async function IdSearch(): Promise<IdSearchResult[]> {
  let result = await _idSearch();
  if(result.length === 0) {
    console.log("No results");
  }
  return result;
}

async function _idSelect(ids: IdSearchResult[]): Promise<string> {
  const question: PromptObject = {
    type: 'autocomplete',
    name: 'animeId',
    message: 'Which one is right? (autocomplete or arrow keys)',
    choices: ids.map((e) => {
        return {
          title: e.title,
          description: e.description,
          value: e.id
        };
    })
  };
  let result = await prompts(question);
  return result.animeId;
}

export async function IdSelect(ids: IdSearchResult[]): Promise<string> {
  return await _idSelect(ids);
}

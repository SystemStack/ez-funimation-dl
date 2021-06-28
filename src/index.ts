import { IdSearch, IdSelect } from './search.id';
import { EpisodeSearch, EpisodeSelect } from './search.episode';
const run = async() => {
    while(true) {
      let idSearchResult = await IdSearch();
      
      let animeId = await IdSelect(idSearchResult);
      
      let episodeResult = await EpisodeSearch(animeId);

      let episodesToDownload = await EpisodeSelect(episodeResult);
      
  }
}
run();



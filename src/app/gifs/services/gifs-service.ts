import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GiphyResponse } from '../interfaces/giphy-interface';
import { Gif } from '../interfaces/gif-interface';
import { GifMapper } from '../mapper/gif-mapper';
import { tap } from 'rxjs'

const GIF_KEY = 'gifs'

const loadFromLocalStorage = () => {
  const gifsFromLocalStorage = localStorage.getItem(GIF_KEY) ?? '{}'

  return JSON.parse(gifsFromLocalStorage)

}


@Injectable({
  providedIn: 'root'
})
export class GifsService {

  private http = inject(HttpClient)


  trendingGifs = signal<Gif[]>([])
  trendingGifsLoading = signal(true)

  searchHistory = signal<Record<string, Gif[]>>(loadFromLocalStorage())
  searchHistoryKeys = computed(() => Object.keys(this.searchHistory()))

  constructor() {
    this.loadTrendingGifs()
  }

  saveGifsToLocalStorage = effect(() => {

    const historyString = JSON.stringify(this.searchHistory())

    localStorage.setItem(GIF_KEY, historyString)
  })


  loadTrendingGifs() {

    this.http.get<GiphyResponse>(environment.giphyUrl + "/gifs/trending", {
      params: {
        api_key: environment.giphyApiKey,
        limit: 2
      }
    }).subscribe(res => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(res.data)

      console.log(gifs);
      this.trendingGifs.set(gifs)
      this.trendingGifsLoading.set(false)

    })
  }

  searchGifs(query: string) {

    return this.http.get<GiphyResponse>(environment.giphyUrl + "/gifs/search", {
      params: {
        api_key: environment.giphyApiKey,
        limit: 3,
        q: query
      }
    }).pipe(
      tap(res => {
        const gifs = GifMapper.mapGiphyItemsToGifArray(res.data)
        this.searchHistory.update((history) => ({
          ...history,
          [query.toLowerCase()]: gifs,
        }))
      })
    )

    // .subscribe( res => {
    //   const gifs = GifMapper.mapGiphyItemsToGifArray(res.data)

    //   console.log(gifs);


    //   this.trendingGifsLoading.set(false)
    // })
  }


  getHistoryGifs( query: string ){
    return this.searchHistory()[query] ?? []
  }
}

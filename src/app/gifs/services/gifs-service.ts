import { HttpClient } from '@angular/common/http';
import { computed, effect, inject, Injectable, signal } from '@angular/core';
import { environment } from '../../../environments/environment.development';
import { GiphyResponse } from '../interfaces/giphy-interface';
import { Gif } from '../interfaces/gif-interface';
import { GifMapper } from '../mapper/gif-mapper';
import { tap } from 'rxjs'
import TrendingPage from '../pages/trending-page/trending-page';

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
  trendingGifsLoading = signal(false)
  private trendingPage = signal(0)

  trendingGifGroup = computed<Gif[][]>(() => {
    const groups = [];

    for (let i = 0; i < this.trendingGifs().length; i +=3) {
      groups.push( this.trendingGifs().slice(i, i + 3))
    }


    return groups;
  })

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

    if (this.trendingGifsLoading()) return

    this.trendingGifsLoading.set(true)

    this.http.get<GiphyResponse>(environment.giphyUrl + "/gifs/trending", {
      params: {
        api_key: environment.giphyApiKey,
        limit: 24,
        offset: this.trendingPage() * 24
      }
    }).subscribe(res => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(res.data)

      this.trendingPage.update(currentPage => currentPage + 1)
      this.trendingGifs.update(currentGifs => [
        ...currentGifs,
        ...gifs
      ])
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

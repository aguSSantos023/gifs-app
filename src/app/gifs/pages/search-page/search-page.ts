import { Component, inject, signal } from '@angular/core';
import { GifListComponent } from "../../components/gif-list-component/gif-list-component";
import { GifsService } from '../../services/gifs-service';
import { GifMapper } from '../../mapper/gif-mapper';
import { Gif } from '../../interfaces/gif-interface';

@Component({
  selector: 'app-search-page',
  imports: [GifListComponent],
  templateUrl: './search-page.html',
  styleUrl: './search-page.css'
})
export default class SearchPage {

  gifsService = inject(GifsService)
  gifs = signal<Gif[]>([])

  onSearch( query: string ){

    if (query.trim().length <= 0) return

    this.gifsService.searchGifs(query).subscribe( res => {
      const gifs = GifMapper.mapGiphyItemsToGifArray(res.data)

      this.gifs.set(gifs)
    })

  }
}

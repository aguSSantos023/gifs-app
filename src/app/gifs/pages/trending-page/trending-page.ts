import { Component, computed, inject } from '@angular/core';
import { GifListComponent } from "../../components/gif-list-component/gif-list-component";
import { GifsService } from '../../services/gifs-service';



@Component({
  selector: 'app-trending-page',
  imports: [GifListComponent],
  templateUrl: './trending-page.html',
  styleUrl: './trending-page.css'
})
export default class TrendingPage {
  gifService = inject(GifsService)


}

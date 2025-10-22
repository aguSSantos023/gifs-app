import { AfterViewInit, Component, computed, ElementRef, inject, viewChild } from '@angular/core';
import { GifListComponent } from "../../components/gif-list-component/gif-list-component";
import { GifsService } from '../../services/gifs-service';
import { ScrollStateS } from '../../../shared/services/scroll-state-s';



@Component({
  selector: 'app-trending-page',
  // imports: [GifListComponent],
  templateUrl: './trending-page.html',
  styleUrl: './trending-page.css'
})
export default class TrendingPage implements AfterViewInit {

  gifService = inject(GifsService)
  scrollStateService = inject(ScrollStateS)

  scrollDivRef = viewChild<ElementRef<HTMLDivElement>>('groupDiv')

  ngAfterViewInit(): void {
    const scrollDiv = this.scrollDivRef()?.nativeElement

    if(!scrollDiv) return


    scrollDiv.scrollTop = this.scrollStateService.trendingScrollState()

  }

  onScroll(event: Event){
    const scrollDiv = this.scrollDivRef()?.nativeElement

    if(!scrollDiv) return

    const scrollTop = scrollDiv.scrollTop
    const clientHeight = scrollDiv.clientHeight
    const scrollHeight = scrollDiv.scrollHeight

    // console.log({scrollTotal: scrollTop + clientHeight ,scrollTop, clientHeight, scrollHeight});


    const isAtBottom = scrollTop + clientHeight + 100 >= scrollHeight;

    this.scrollStateService.trendingScrollState.set(scrollTop)


    if (isAtBottom) this.gifService.loadTrendingGifs()



  }



}

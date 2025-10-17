import { Component, input, WritableSignal } from '@angular/core';
import { GifListItemComponent } from "./gif-list-item-component/gif-list-item-component";
import { Gif } from '../../interfaces/gif-interface';

@Component({
  selector: 'gifs-gif-list-component',
  imports: [GifListItemComponent],
  templateUrl: './gif-list-component.html',
  styleUrl: './gif-list-component.css'
})
export class GifListComponent {

  gifs = input.required<Gif[]>()

}

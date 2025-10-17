import { Component, input } from '@angular/core';

@Component({
  selector: 'gift-gif-list-item-component',
  imports: [],
  templateUrl: './gif-list-item-component.html',
  styleUrl: './gif-list-item-component.css'
})
export class GifListItemComponent {

  nameUrl = input.required<string>()

}

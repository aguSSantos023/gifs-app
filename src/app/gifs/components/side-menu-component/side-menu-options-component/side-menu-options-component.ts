import { Component, inject } from '@angular/core';
import { RouterLink, RouterLinkActive } from "@angular/router";
import { GifsService } from '../../../services/gifs-service';

interface MenuOption {
  label: string;
  subLabel: string;
  route: string;
  icon: string;
}

@Component({
  selector: 'gifs-side-menu-options-component',
  imports: [RouterLink, RouterLinkActive],
  templateUrl: './side-menu-options-component.html',
  styleUrl: './side-menu-options-component.css'
})
export class SideMenuOptionsComponent {

  gifsService = inject(GifsService)

  menuOptions: MenuOption[] = [
    {
      label: 'Trending',
      subLabel: 'Gifs Populares',
      route: '/dashboard/trending',
      icon: 'fa-solid fa-chart-line',
    },
    {
      label: 'Search',
      subLabel: 'Buscador gifs',
      route: '/dashboard/search',
      icon: 'fa-solid fa-magnifying-glass',
    }
  ]

}

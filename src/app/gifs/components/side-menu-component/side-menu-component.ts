import { Component } from '@angular/core';
import { SideMenuHeaderComponent } from "./side-menu-header-component/side-menu-header-component";
import { SideMenuOptionsComponent } from "./side-menu-options-component/side-menu-options-component";

@Component({
  selector: 'gifs-side-menu-component',
  imports: [SideMenuHeaderComponent, SideMenuOptionsComponent],
  templateUrl: './side-menu-component.html',
  styleUrl: './side-menu-component.css'
})
export class SideMenuComponent {

}

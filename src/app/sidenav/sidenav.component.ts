import { BreakpointObserver } from '@angular/cdk/layout';
import { NgClass, NgIf } from '@angular/common';
import { Component, ViewChild, inject } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import {MatToolbarModule} from '@angular/material/toolbar';
import { CustomThemeService } from '../services/custom-theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatGridListModule } from '@angular/material/grid-list';

export interface Tile {
  title: string;
  subtitle: string;
  description: string;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule, NgIf, MatSlideToggleModule, NgClass, MatCardModule, ScrollingModule, MatGridListModule],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent {
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile: boolean = true;
  isCollapsed: boolean = true;
  CustomThemeService: CustomThemeService = inject(CustomThemeService);
  tiles: Tile[] = [{title: 'Shiba Inu', subtitle: 'Dog Breed', description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'},
    {title: 'Shiba Inu', subtitle: 'Dog Breed', description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'},
    {title: 'Shiba Inu', subtitle: 'Dog Breed', description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'},
    {title: 'Shiba Inu', subtitle: 'Dog Breed', description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting.'}
  ];

  constructor(private observer: BreakpointObserver) {}

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if(screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });
  }

  toggleSideNavigationMenu() {
    if(this.isMobile) {
      this.sidenav.toggle();
      this.isCollapsed = false;
    } else {
      this.sidenav.open();
      this.isCollapsed = !this.isCollapsed;
    }
  }

  toggleTheme() {
    this.CustomThemeService.updateTheme();
  }
}

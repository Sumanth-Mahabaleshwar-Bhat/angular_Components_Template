import { BreakpointObserver } from '@angular/cdk/layout';
import { JsonPipe, NgClass, NgFor, NgIf } from '@angular/common';
import { Component, ViewChild, inject, signal, viewChild } from '@angular/core';
import { MatButtonModule } from '@angular/material/button';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { MatSidenav, MatSidenavModule } from '@angular/material/sidenav';
import { MatToolbarModule } from '@angular/material/toolbar';
import { CustomThemeService } from '../services/custom-theme.service';
import { MatSlideToggleModule } from '@angular/material/slide-toggle';
import { MatCardModule } from '@angular/material/card';
import { ScrollingModule } from '@angular/cdk/scrolling';
import { MatGridListModule } from '@angular/material/grid-list';
import { MatMenuModule } from '@angular/material/menu';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatAccordion, MatExpansionModule } from '@angular/material/expansion';
import { MatDatepickerModule } from '@angular/material/datepicker';
import { FormGroup, FormControl, FormsModule, ReactiveFormsModule } from '@angular/forms';
import { provideNativeDateAdapter } from '@angular/material/core';
import { OnInit, HostListener, ElementRef } from '@angular/core';
import Keyboard from 'simple-keyboard';
//import 'simple-keyboard/build/css/index.css'; // Import the simple-keyboard CSS
import {CdkDrag} from '@angular/cdk/drag-drop';
import { NgbTimepickerModule } from '@ng-bootstrap/ng-bootstrap';

export interface Tile {
  title: string;
  subtitle: string;
  description: string;
  cols?: number;
  rows?: number;
}

@Component({
  selector: 'app-sidenav',
  standalone: true,
  providers: [provideNativeDateAdapter()],
  imports: [MatToolbarModule, MatIconModule, MatButtonModule, MatSidenavModule, MatListModule, NgIf, MatSlideToggleModule, NgClass, MatCardModule, ScrollingModule, MatGridListModule, NgFor, MatMenuModule, MatFormFieldModule, MatInputModule, MatExpansionModule, MatDatepickerModule,
    MatFormFieldModule, MatDatepickerModule, FormsModule, ReactiveFormsModule, JsonPipe, CdkDrag, NgbTimepickerModule
  ],
  templateUrl: './sidenav.component.html',
  styleUrl: './sidenav.component.scss'
})
export class SidenavComponent implements OnInit {
  keyboard: Keyboard | undefined;
  inputValue: string = ''; // Variable to hold the input field value
  keyboardVisible: boolean = false; // Variable to manage keyboard visibility
  time = { hour: 13, minute: 30 };
	meridian = true;

  readonly range = new FormGroup({
    start: new FormControl<Date | null>(null),
    end: new FormControl<Date | null>(null),
  });
  
  @ViewChild(MatSidenav)
  sidenav!: MatSidenav;
  isMobile: boolean = true;
  isCollapsed: boolean = true;
  CustomThemeService: CustomThemeService = inject(CustomThemeService);
  cards = signal<Tile[]>([]);
  setDarkModeToDisabled: boolean = false;
  setLightModeToDisabled: boolean = false;
  accordion = viewChild.required(MatAccordion);

  constructor(private observer: BreakpointObserver, private elementRef: ElementRef) {
    const cards: Tile[] = [];
    for (let i = 0; i < 9; i++) {
      cards.push({
        title: 'Shiba Inu',
        subtitle: 'Dog Breed',
        description: 'The Shiba Inu is the smallest of the six original and distinct spitz breeds of dog from Japan. A small, agile dog that copes very well with mountainous terrain, the Shiba Inu was originally bred for hunting'
      });
    }

    this.cards.set(cards);
  }

  ngOnInit() {
    this.observer.observe(['(max-width: 800px)']).subscribe((screenSize) => {
      if (screenSize.matches) {
        this.isMobile = true;
      } else {
        this.isMobile = false;
      }
    });

    // Initialize the simple-keyboard instance with proper layout and theme
    this.keyboard = new Keyboard({
      layout: {
        default: [
          "` 1 2 3 4 5 6 7 8 9 0 - = {bksp}",
          "q w e r t y u i o p [ ] \\",
          "a s d f g h j k l ; ' {enter}",
          "z x c v b n m , . / {shift}",
          "{space}"
        ],
      },
      theme: 'hg-theme-default hg-layout-default', // Apply default themes
      display: {
        '{bksp}': 'backspace',
        '{enter}': 'enter',
        '{shift}': 'shift',
        '{space}': 'space'
      },
      onChange: input => this.onInputChange(input),
      onKeyPress: button => this.onKeyPress(button),
    });
  }

  toggleSideNavigationMenu() {
    if (this.isMobile) {
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

  checkCurrentTheme() {
    if (this.CustomThemeService.themeSignal() === 'dark-mode') {
      this.setDarkModeToDisabled = true;
    } else if (this.CustomThemeService.themeSignal() === 'light-mode') {
      this.setLightModeToDisabled = true;
    }
  }

  selectedDate: Date | null = null;
  selectedTime: string | null = null;

  // Function to handle date change
  onDateChange(event: any): void {
    this.selectedDate = event.value;
  }

  // Function to handle time change
  onTimeChange(event: any): void {
    this.selectedTime = event.target.value;
  }

  // Function to show the keyboard
  showKeyboard(): void {
    this.keyboardVisible = true;
    if (this.keyboard) {
      this.keyboard.setInput(this.inputValue);
    }
  }

  // Function to hide the keyboard on blur event
  hideKeyboardOnBlur(event: FocusEvent): void {
    this.keyboardVisible = false;
  }

  // Function to hide the keyboard when clicking outside the component
  @HostListener('document:click', ['$event'])
  hideKeyboardOnClick(event: MouseEvent): void {
    // Check if the clicked element is outside of the component
    if (!this.elementRef.nativeElement.contains(event.target)) {
      this.keyboardVisible = false;
    }
  }

  // Update input value when the keyboard changes
  onInputChange(input: string): void {
    this.inputValue = input;
  }

  // Handle key press events if needed
  onKeyPress(button: string): void {
    console.log('Button pressed:', button);
  }
}

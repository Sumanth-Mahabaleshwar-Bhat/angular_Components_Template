import { Injectable, signal } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class CustomThemeService {
  themeSignal = signal<string>("dark-mode");

  setTheme(theme: string) {
    this.themeSignal.set(theme);
  }

  updateTheme() {
    this.themeSignal.update((value) => (value === "dark-mode" ? "light-mode" : "dark-mode"));
  }
}

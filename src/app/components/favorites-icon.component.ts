import { Component, Output, EventEmitter, input, Signal } from '@angular/core';

@Component({
  selector: 'app-favorites-icon',
  standalone: true,
  template: `
      <button (click)="openModal.emit()" class="relative">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-8 h-8 text-white hover:text-pink-400 transition">
          <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54l-1.35 1.31z" />
        </svg>
        @if (favoritesCount() > 0) {
          <span class="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">{{ favoritesCount() }}</span>
        }
      </button>
    `
})
export class FavoritesIconComponent {
  @Output() openModal = new EventEmitter<void>();
  favoritesCount = input(0);
}


import { Component, inject, signal, computed } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Item } from '../interfaces/item.interface';

import { CommonModule } from '@angular/common';
@Component({
  selector: 'app-favorites-icon',
  standalone: true,
  imports: [CommonModule],
  template: `
    <div>
      <button (click)="openFavoritesModal()" class="relative cursor-pointer">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-8 h-8 text-pink-500">
          <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54l-1.35 1.31z" />
        </svg>
        @if (favorites().length > 0) {
          <span class="absolute -top-1 -right-1 bg-pink-500 text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">{{ favorites().length }}</span>
        }
      </button>

      @if (favoritesModalOpen()) {
        <div class="fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50 px-4">
          <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
            <button (click)="closeFavoritesModal()" class="absolute top-2 right-2 w-10 h-10 flex items-center justify-center cursor-pointer text-2xl bg-gray-200 rounded-full shadow hover:bg-gray-300 transition-all pb-1" aria-label="Close modal">&times;</button>
            <h3 class="text-xl font-bold mb-4">Favorites</h3>
            @if (favorites().length > 0) {
              @for (fav of favorites(); track fav.id) {
                <div class="flex items-center gap-2 mb-2">
                  <img [src]="'/img/'+fav.image" alt="Fav image" class="w-12 h-12 object-cover rounded" />
                  <span class="flex-1">{{ fav.title }}</span>
                  <button (click)="removeFavorite(fav)" class="text-red-500 hover:underline cursor-pointer">Remove</button>
                </div>
              }
            } @else {
              <p class="text-gray-400 text-center">No favorites yet.</p>
            }
          </div>
        </div>
      }
    </div>
  `
})
export class FavoritesIconComponent {
  private favoritesService = inject(FavoritesService);
  favorites = this.favoritesService.favorites;
  favoritesModalOpen = signal(false);

  openFavoritesModal() {
    this.favoritesModalOpen.set(true);
  }
  closeFavoritesModal() {
    this.favoritesModalOpen.set(false);
  }
  removeFavorite(fav: Item) {
    this.favoritesService.removeFromFavorites(fav.id);
  }
  trackById(index: number, item: Item) {
    return item.id;
  }
}

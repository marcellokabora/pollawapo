
import { Component, inject, signal } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Item } from '../interfaces/item.interface';

@Component({
  selector: 'app-favorites',
  imports: [],
  template: `
    <div>
      <button (click)="openFavoritesModal()" class="relative cursor-pointer focus-visible:outline-offset-2 focus-visible:outline-secondary">
        <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-8 h-8 text-secondary">
          <path d="M12.1 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54l-1.35 1.31z" />
        </svg>
        @if (favorites().length > 0) {
          <span class="absolute -top-1 -right-1 bg-secondary text-white text-xs rounded-full w-5 h-5 flex items-center justify-center border-2 border-white">{{ favorites().length }}</span>
        }
      </button>

      @if (favoritesModalOpen()) {
        <div class="fixed inset-0 bg-black/50 z-40" (click)="closeFavoritesModal()"></div>
        <div class="fixed inset-0 flex items-center justify-center z-50 px-4 pointer-events-none">
          <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative max-h-[80vh] overflow-y-auto pointer-events-auto">
            <button (click)="closeFavoritesModal()" class="absolute top-4 right-4 w-10 h-10 flex items-center justify-center cursor-pointer text-2xl rounded-full shadow-sm hover:shadow-md transition-all pb-1" aria-label="Close modal">&times;</button>
            <h3 class="text-xl font-bold mb-4">Favorites</h3>
            @if (favorites().length > 0) {
              @for (fav of favorites(); track fav.title) {
                <div class="flex items-center gap-4 mb-3 p-3 rounded-lg bg-gray-50 shadow-sm border border-gray-200 transition hover:shadow-md">
                  <img [src]="'/img/'+fav.image" alt="Fav image" class="w-14 h-14 object-cover rounded-lg border border-gray-300" />
                  <span class="flex-1 text-base font-medium text-gray-800">{{ fav.title }}</span>
                  <button (click)="removeFavorite(fav)" class="p-2 rounded-full bg-red-100 text-secondary hover:shadow-md transition-colors shadow-xs focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-secondary cursor-pointer" aria-label="Remove from favorites">
                    <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5">
                      <path stroke-linecap="round" stroke-linejoin="round" d="M6.75 7.5h10.5M9.75 7.5V6.75A2.25 2.25 0 0 1 12 4.5a2.25 2.25 0 0 1 2.25 2.25v.75m-7.5 0h12a.75.75 0 0 1 .75.75v10.5a2.25 2.25 0 0 1-2.25 2.25H7.5a2.25 2.25 0 0 1-2.25-2.25V8.25a.75.75 0 0 1 .75-.75zm3.75 3.75v4.5m3-4.5v4.5" />
                    </svg>
                  </button>
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
export class FavoritesComponent {
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
    this.favoritesService.removeFromFavorites(fav.title);
  }
}

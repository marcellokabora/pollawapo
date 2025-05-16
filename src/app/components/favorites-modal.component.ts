import { Component, Output, EventEmitter, inject, input } from '@angular/core';
import { FavoritesService } from '../services/favorites.service';
import { Item } from '../interfaces/item.interface';

@Component({
  selector: 'app-favorites-modal',
  template: `
    @if (open()) {
      <div class="fixed inset-0 bg-black/80 bg-opacity-40 flex items-center justify-center z-50 px-4">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
          <button (click)="close.emit()" class="absolute top-2 right-2 w-10 h-10 flex items-center justify-center cursor-pointer text-2xl bg-gray-200 rounded-full shadow hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-400 transition-all" aria-label="Close modal">&times;</button>
          <h3 class="text-xl font-bold mb-4">Favorites</h3>
          @if (favorites()?.length) {
            @for (fav of favorites(); track fav.id) {
              <div class="flex items-center gap-2 mb-2">
                <img [src]="fav.image" alt="Fav image" class="w-12 h-12 object-cover rounded" />
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
  `
})
export class FavoritesModalComponent {
  open = input.required<boolean>();
  favorites = input<Item[]>();
  @Output() close = new EventEmitter<void>();
  @Output() remove = new EventEmitter<any>();
  private favoritesService = inject(FavoritesService);

  removeFavorite(fav: any) {
    this.favoritesService.removeFromFavorites(fav.id);
  }
}

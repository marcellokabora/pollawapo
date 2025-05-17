import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FavoritesService } from '../services/favorites.service';
import { inject } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Component({
  selector: 'app-item-card',
  imports: [CurrencyPipe],
  template: `
    <div class="bg-white rounded shadow p-4 flex flex-col gap-2 h-full">
      <img [src]="'/img/' + item().image" alt="Item image" class="w-full h-40 object-cover rounded" />
      <h2 class="text-lg font-semibold">{{ item().title }}</h2>
      <p class="text-gray-600 grow">{{ item().description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-blue-700 font-bold">{{ item().price | currency }}</span>
        <span class="text-xs text-gray-400">{{ item().email }}</span>
      </div>
      @if (!isFavorite()) {
        <button (click)="addToFavorites()"
          class="mt-2 bg-brand text-white px-4 py-2 rounded-md shadow w-full flex justify-center items-center border-2 border-transparent transition duration-150 focus:outline-none cursor-pointer hover:ring-2 hover:ring-brand hover:ring-offset-2 hover:ring-offset-white">
          <span class="inline-flex items-center gap-2 justify-center w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-5 h-5 -mb-1">
              <path stroke-linecap="round" stroke-linejoin="round" d="M11.48 3.499a5.25 5.25 0 0 1 7.415 7.415l-6.364 6.364a.75.75 0 0 1-1.06 0l-6.364-6.364a5.25 5.25 0 1 1 7.415-7.415z" />
            </svg>
            Add to Favorites
          </span>
        </button>
      } @else {
        <button (click)="removeFromFavorites()"
          class="mt-2 bg-pink-500 text-white px-4 py-2 rounded-md shadow w-full flex justify-center items-center border-2 border-transparent transition duration-150 focus:outline-none cursor-pointer hover:ring-2 hover:ring-pink-500 hover:ring-offset-2 hover:ring-offset-white">
          <span class="inline-flex items-center gap-2 justify-center w-full">
            <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" viewBox="0 0 24 24" class="w-5 h-5">
              <path d="M12 21.35l-1.45-1.32C5.4 15.36 2 12.28 2 8.5 2 5.42 4.42 3 7.5 3c1.74 0 3.41 0.81 4.5 2.09C13.09 3.81 14.76 3 16.5 3 19.58 3 22 5.42 22 8.5c0 3.78-3.4 6.86-8.55 11.54L12 21.35z" />
            </svg>
            Remove from Favorites
          </span>
        </button>
      }
    </div>
  `
})
export class ItemCardComponent {
  item = input.required<Item>();
  private favoritesService = inject(FavoritesService);

  isFavorite() {
    return this.favoritesService.isFavorite(this.item().title);
  }

  addToFavorites() {
    this.favoritesService.addToFavorites(this.item());
  }

  removeFromFavorites() {
    this.favoritesService.removeFromFavorites(this.item().title);
  }
}

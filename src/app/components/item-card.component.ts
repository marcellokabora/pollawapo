import { Component, input } from '@angular/core';
import { CurrencyPipe } from '@angular/common';
import { FavoritesService } from '../services/favorites.service';
import { inject } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Component({
  selector: 'app-item-card',
  imports: [CurrencyPipe],
  template: `
    <div class="bg-white rounded shadow p-4 flex flex-col gap-2">
      <img [src]="item().image" alt="Item image" class="w-full h-40 object-cover rounded" />
      <h2 class="text-lg font-semibold">{{ item().title }}</h2>
      <p class="text-gray-600">{{ item().description }}</p>
      <div class="flex justify-between items-center">
        <span class="text-blue-700 font-bold">{{ item().price | currency }}</span>
        <span class="text-xs text-gray-400">{{ item().email }}</span>
      </div>
      @if (!isFavorite()) {
        <button (click)="addToFavorites()" class="mt-2 bg-brand text-white px-3 py-1 rounded">Add to Favorites</button>
      } @else {
        <button (click)="removeFromFavorites()" class="mt-2 bg-pink-500 text-white px-3 py-1 rounded">Remove from Favorites</button>
      }
    </div>
  `
})
export class ItemCardComponent {
  item = input.required<Item>();
  private favoritesService = inject(FavoritesService);

  isFavorite() {
    return this.favoritesService.isFavorite(this.item().id);
  }

  addToFavorites() {
    this.favoritesService.addToFavorites(this.item());
  }

  removeFromFavorites() {
    this.favoritesService.removeFromFavorites(this.item().id);
  }
}

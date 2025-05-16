import { Injectable, signal, computed } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    private favoritesSignal = signal<Item[]>([]);

    get favorites() {
        return computed(() => this.favoritesSignal());
    }

    addToFavorites(item: Item) {
        if (!this.favoritesSignal().some(fav => fav.id === item.id)) {
            this.favoritesSignal.set([...this.favoritesSignal(), item]);
        }
    }

    removeFromFavorites(itemId: number) {
        this.favoritesSignal.set(this.favoritesSignal().filter(fav => fav.id !== itemId));
    }

    isFavorite(itemId: number): boolean {
        return this.favoritesSignal().some(fav => fav.id === itemId);
    }

    clearFavorites() {
        this.favoritesSignal.set([]);
    }
}

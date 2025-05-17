import { Injectable, signal, computed } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Injectable({ providedIn: 'root' })
export class FavoritesService {
    private favoritesSignal = signal<Item[]>([]);

    get favorites() {
        return computed(() => this.favoritesSignal());
    }

    addToFavorites(item: Item) {
        if (!this.favoritesSignal().some(fav => fav.title === item.title)) {
            this.favoritesSignal.set([...this.favoritesSignal(), item]);
        }
    }

    removeFromFavorites(itemTitle: string) {
        this.favoritesSignal.set(this.favoritesSignal().filter(fav => fav.title !== itemTitle));
    }

    isFavorite(itemTitle: string): boolean {
        return this.favoritesSignal().some(fav => fav.title === itemTitle);
    }

}

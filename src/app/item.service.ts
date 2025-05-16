import { Injectable, computed, signal } from '@angular/core';
import { MOCK_ITEMS } from './mock-items';

export interface Item {
    id: number;
    title: string;
    description: string;
    price: number;
    email: string;
    image: string;
}

@Injectable({ providedIn: 'root' })
export class ItemService {
    private itemsSignal = signal<Item[]>(MOCK_ITEMS);

    getItems = computed(() => this.itemsSignal());

    // Simulate async fetch
    fetchItems(): Promise<Item[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.itemsSignal()), 2000);
        });
    }

    // Simulate async paginated fetch
    fetchItemsPage(page: number, pageSize: number): Promise<Item[]> {
        return new Promise(resolve => {
            setTimeout(() => {
                const all = this.itemsSignal();
                const start = (page - 1) * pageSize;
                const end = start + pageSize;
                resolve(all.slice(start, end));
            }, 500);
        });
    }
}

import { Injectable, signal } from '@angular/core';
import { MOCK_ITEMS } from '../mocks/mock-items';
import { Item } from '../interfaces/item.interface';

@Injectable({ providedIn: 'root' })
export class ItemService {
    private itemsSignal = signal<Item[]>(MOCK_ITEMS);

    // Simulate async fetch
    fetchItems(): Promise<Item[]> {
        return new Promise(resolve => {
            setTimeout(() => resolve(this.itemsSignal()), 1000);
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
            }, 1000);
        });
    }
}

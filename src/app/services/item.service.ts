
import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item.interface';

// Helper to fake loading delay
function fakeDelay(ms: number) {
    return new Promise(resolve => setTimeout(resolve, ms));
}

@Injectable({ providedIn: 'root' })
export class ItemService {
    private apiUrl = '/data.json';
    private itemsCache: Item[] | null = null;


    // Fetch items from data.json (with cache)
    async fetchItems(): Promise<Item[]> {
        await fakeDelay(1000); // 1 second fake loading
        if (this.itemsCache) {
            return this.itemsCache;
        }
        const response = await fetch(this.apiUrl);
        const data = await response.json();
        // If data.json has { items: [...] }
        const items: Item[] = Array.isArray(data) ? data : data.items;
        this.itemsCache = items;
        return items;
    }

    // Fetch paginated items from data.json
    async fetchItemsPage(page: number, pageSize: number): Promise<Item[]> {
        await fakeDelay(1000); // 1 second fake loading
        const all = await this.fetchItems();
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        return all.slice(start, end);
    }
}

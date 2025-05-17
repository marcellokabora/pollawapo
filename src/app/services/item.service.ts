

import { Injectable } from '@angular/core';
import { Item } from '../interfaces/item.interface';

@Injectable({ providedIn: 'root' })
export class ItemService {
    // Use the MSW handler endpoint for the API
    private apiUrl = '/api/items';
    private itemsCache: Item[] | null = null;
    private itemsPromise: Promise<Item[]> | null = null;

    constructor() { }

    // Fetch items from data.json (with cache) using native fetch and Promise
    async fetchItems(): Promise<Item[]> {
        if (this.itemsCache) {
            return this.itemsCache;
        }
        if (this.itemsPromise) {
            return this.itemsPromise;
        }
        this.itemsPromise = (async () => {
            const response = await fetch(this.apiUrl);
            if (!response.ok) {
                throw new Error('Failed to fetch items');
            }
            const data = await response.json();
            const items = Array.isArray(data) ? (data as Item[]) : data.items;
            this.itemsCache = items;
            return items;
        })();
        return this.itemsPromise;
    }

    /**
     * Fetch items with optional pagination and search.
     * @param page Page number (1-based)
     * @param pageSize Number of items per page
     * @param searchTerm Optional search string to filter items by title or description
     */
    async fetchItemsPage(
        page: number,
        pageSize: number,
        searchTerm?: string
    ): Promise<{ items: Item[]; total: number }> {
        await new Promise(res => setTimeout(res, 1000)); // delay 1 second
        let all = await this.fetchItems();
        if (searchTerm && searchTerm.trim() !== '') {
            const term = searchTerm.trim().toLowerCase();
            all = all.filter(item =>
                item.title.toLowerCase().includes(term) ||
                (item.description && item.description.toLowerCase().includes(term))
            );
        }
        const total = all.length;
        const start = (page - 1) * pageSize;
        const end = start + pageSize;
        const items = all.slice(start, end);
        return { items, total };
    }
}


import { Injectable, signal, effect, inject } from '@angular/core';
import { ItemService } from './item.service';
import { Item } from '../interfaces/item.interface';

@Injectable({ providedIn: 'root' })
export class ManagerService {

    searchTerm = signal('');
    allItems = signal<Item[]>([]);
    page = signal(1);
    totalItems = signal(0);

    private itemService = inject(ItemService);
    private pageSize = 5;
    public loading = false;
    public allLoaded = false;

    constructor() {
        // Effect runs whenever page or searchTerm changes
        effect(async () => {
            const page = this.page();
            const term = this.searchTerm();
            // Reset items and loaded flag on new search
            if (page === 1) {
                this.allItems.set([]);
                this.allLoaded = false;
            }
            if (this.allLoaded) return;
            this.loading = true;
            try {
                // Fetch items for current page and search term
                const { items: newItems, total } = await this.itemService.fetchItemsPage(page, this.pageSize, term);
                this.totalItems.set(total);
                // Mark allLoaded if no more items to fetch
                if (newItems.length < this.pageSize || (page * this.pageSize) >= total) this.allLoaded = true;
                if (page === 1) {
                    this.allItems.set(newItems);
                } else {
                    this.allItems.set([...this.allItems(), ...newItems]);
                }
            } catch (e) {
                // On error, reset loading and keep items empty
                this.allItems.set([]);
            } finally {
                this.loading = false;
            }
        });
    }

    // Loads the next page of items if not already loading or fully loaded
    loadNextPage() {
        if (this.loading || this.allLoaded) return;
        this.page.set(this.page() + 1);
    }
}

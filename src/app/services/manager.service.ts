import { Injectable, signal, effect, inject } from '@angular/core';
import { ItemService } from './item.service';
import { Item } from '../interfaces/item.interface';
import { ActivatedRoute } from '@angular/router';

@Injectable({ providedIn: 'root' })
export class ManagerService {

    searchTerm = signal('');
    allItems = signal<Item[]>([]);
    page = signal(1);

    private itemService = inject(ItemService);
    private pageSize = 5;
    public loading = false;
    public allLoaded = false;

    constructor() {
        const route = inject(ActivatedRoute);
        route.queryParamMap.subscribe(params => {
            const search = params.get('search') || '';
            this.searchTerm.set(search);
            this.page.set(1);
        });

        effect(async () => {
            const page = this.page();
            const term = (this.searchTerm() || '').toLowerCase();
            if (page === 1) {
                this.allItems.set([]);
                this.allLoaded = false;
            }
            if (this.allLoaded) return;
            this.loading = true;
            let newItems: Item[] = [];
            if (!term) {
                newItems = await this.itemService.fetchItemsPage(page, this.pageSize);
            } else {
                const all = await this.itemService.fetchItems();
                const filtered = all.filter(item =>
                    item.title.toLowerCase().includes(term) ||
                    item.description.toLowerCase().includes(term) ||
                    item.price.toString().includes(term) ||
                    item.email.toLowerCase().includes(term)
                );
                const start = (page - 1) * this.pageSize;
                newItems = filtered.slice(start, start + this.pageSize);
                if (start + this.pageSize >= filtered.length) this.allLoaded = true;
            }
            if (newItems.length < this.pageSize) this.allLoaded = true;
            if (page === 1) {
                this.allItems.set(newItems);
            } else {
                this.allItems.set([...this.allItems(), ...newItems]);
            }
            this.loading = false;
        });
    }

    loadNextPage() {
        if (this.loading || this.allLoaded) return;
        this.page.set(this.page() + 1);
    }
}

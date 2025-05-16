import { Component, signal, computed, inject, effect } from '@angular/core';
import { ItemListComponent } from './item-list.component';
import { ItemService } from '../services/item.service';
import { Item } from '../interfaces/item.interface';

@Component({
  selector: 'app-item-manager',
  imports: [ItemListComponent],
  template: `
    <section>
      <form class="flex flex-col md:flex-row gap-2 mb-4" (submit)="onSearch($event)">
        <input type="text" placeholder="Search by title, description, price, or email" class="flex-1 p-2 border rounded" [value]="searchTerm()" (input)="searchTerm.set($any($event.target).value)" autocomplete="off" />
        <button type="submit" class="bg-brand text-white px-4 py-2 rounded cursor-pointer">Search</button>
      </form>
      <app-item-list [items]="filteredItems()" (scrolledToEnd)="loadNextPage()" [loading]="loading" [allLoaded]="allLoaded"></app-item-list>
    </section>
  `
})
export class ItemManagerComponent {
  allItems = signal<any[]>([]);
  searchTerm = signal('');
  page = signal(1);
  private itemService = inject(ItemService);
  private pageSize = 6;
  public loading = false;
  public allLoaded = false;

  filteredItems = computed<Item[]>(() => {
    const term = this.searchTerm().toLowerCase();
    const items = this.allItems();
    if (!term) return items;
    return items.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.description.toLowerCase().includes(term) ||
      item.price.toString().includes(term) ||
      item.email.toLowerCase().includes(term)
    );
  });

  constructor() {
    effect(async () => {
      // Reset items if search changes and page is 1
      if (this.page() === 1) {
        this.allItems.set([]);
        this.allLoaded = false;
      }
      if (this.allLoaded) return;
      this.loading = true;
      const page = this.page();
      const term = this.searchTerm().toLowerCase();
      let newItems: any[] = [];
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

  onSearch(event: Event) {
    event.preventDefault();
    this.page.set(1);
  }
}

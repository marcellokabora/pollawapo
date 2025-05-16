import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { SearchQueryService } from '../services/search-query.service';

@Component({
    selector: 'app-search-input',
    standalone: true,
    imports: [FormsModule],
    template: `
    <input
      type="text"
      placeholder="Search..."
      class="px-4 py-2 border-2 border-gray-200 rounded-full w-full sm:min-w-sm focus:ring-2 focus:ring-brand focus:border-brand bg-white placeholder-gray-400 text-gray-800 transition-all duration-200 outline-none"
      [(ngModel)]="currentSearch"
      (ngModelChange)="onInput($event)"
      autocomplete="off"
    />
  `,
})
export class SearchInputComponent implements OnInit, OnDestroy {
    currentSearch = '';
    private searchQuery = inject(SearchQueryService);
    private sub: any;

    ngOnInit() {
        // Sync input with service
        this.sub = this.searchQuery.search$.subscribe((search: string) => {
            this.currentSearch = search;
        });
    }

    ngOnDestroy() {
        this.sub?.unsubscribe();
    }

    onInput(value: string) {
        this.searchQuery.setSearch(value);
    }
}

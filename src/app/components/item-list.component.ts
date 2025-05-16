import { Component, ElementRef, ViewChild, inject, OnInit, OnDestroy } from '@angular/core';
import { ItemCardComponent } from './item-card.component';
import { ManagerService } from '../services/manager.service';
import { SearchQueryService } from '../services/search-query.service';
import { Subscription } from 'rxjs';

// For type safety
import { AfterViewInit } from '@angular/core';

@Component({
  selector: 'app-item-list',
  imports: [ItemCardComponent],
  template: `
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
      @for (item of itemManager.filteredItems(); track item.id) {
        <app-item-card [item]="item"></app-item-card>
      }
    </div>
    <div #anchor></div>
    @if (itemManager.loading) {
      <div class="flex justify-center py-4">
        <span class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-brand"></span>
        <span class="ml-2 text-brand">Loading...</span>
      </div>
    }
  `
})
export class ItemListComponent implements OnInit, AfterViewInit, OnDestroy {
  @ViewChild('anchor', { static: true }) anchor!: ElementRef;
  itemManager = inject(ManagerService);
  private searchQuery = inject(SearchQueryService);
  private sub!: Subscription;
  private observer?: IntersectionObserver;

  ngOnInit() {
    // Subscribe to search query changes and update itemManager
    this.sub = this.searchQuery.search$.subscribe((search) => {
      this.itemManager.searchTerm.set(search);
      this.itemManager.page.set(1);
    });
  }

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.itemManager.loading && !this.itemManager.allLoaded) {
        this.itemManager.loadNextPage();
      }
    });
    if (this.anchor?.nativeElement) {
      this.observer.observe(this.anchor.nativeElement);
    }
  }

  ngOnDestroy() {
    this.sub?.unsubscribe();
    this.observer?.disconnect();
  }
}

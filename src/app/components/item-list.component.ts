import { Component, ElementRef, ViewChild, inject, OnDestroy, AfterViewInit } from '@angular/core';
import { ItemCardComponent } from './item-card.component';
import { ManagerService } from '../services/manager.service';

@Component({
  selector: 'app-item-list',
  imports: [ItemCardComponent],
  template: `
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
      @for (item of manager.filteredItems(); track item.id) {
        <app-item-card [item]="item"></app-item-card>
      }
    </div>
    @if (!manager.loading && manager.filteredItems().length === 0) {
      <div class="text-center text-gray-400 py-8">No products to were found.</div>
    }
    <div #anchor></div>
    @if (manager.loading) {
      <div class="flex justify-center py-4">
        <span class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-brand"></span>
        <span class="ml-2 text-brand">Loading...</span>
      </div>
    }
  `
})
export class ItemListComponent implements AfterViewInit, OnDestroy {
  @ViewChild('anchor', { static: true }) anchor!: ElementRef;
  manager = inject(ManagerService);
  private observer?: IntersectionObserver;

  ngAfterViewInit() {
    this.observer = new IntersectionObserver(entries => {
      if (entries[0].isIntersecting && !this.manager.loading && !this.manager.allLoaded) {
        this.manager.loadNextPage();
      }
    });
    if (this.anchor?.nativeElement) {
      this.observer.observe(this.anchor.nativeElement);
    }
  }

  ngOnDestroy() {
    this.observer?.disconnect();
  }
}

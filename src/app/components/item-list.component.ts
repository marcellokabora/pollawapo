import { Component, Input, signal, Signal, Output, EventEmitter, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { ItemCardComponent } from './item-card.component';

@Component({
  selector: 'app-item-list',
  imports: [ItemCardComponent],
  template: `
    <div class="grid gap-4 grid-cols-1 md:grid-cols-2">
      @for (item of items(); track item.id) {
        <app-item-card [item]="item"></app-item-card>
      }
    </div>
    <div #anchor></div>
    @if (loading) {
      <div class="flex justify-center py-4">
        <span class="animate-spin rounded-full h-6 w-6 border-t-2 border-b-2 border-brand"></span>
        <span class="ml-2 text-brand">Loading...</span>
      </div>
    }
  `
})
export class ItemListComponent implements AfterViewInit {
  @Input({ required: true }) items!: Signal<any[]>;
  @Input() loading = false;
  @Output() scrolledToEnd = new EventEmitter<void>();
  @ViewChild('anchor', { static: true }) anchor!: ElementRef;

  ngAfterViewInit() {
    if (this.anchor) {
      const observer = new IntersectionObserver(entries => {
        if (entries[0].isIntersecting) {
          this.scrolledToEnd.emit();
        }
      });
      observer.observe(this.anchor.nativeElement);
    }
  }
}

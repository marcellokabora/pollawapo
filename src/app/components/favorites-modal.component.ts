import { Component, Input, Output, EventEmitter, signal } from '@angular/core';

@Component({
    selector: 'app-favorites-modal',
    template: `
    @if (open()) {
      <div class="fixed inset-0 bg-black bg-opacity-40 flex items-center justify-center z-50">
        <div class="bg-white rounded-lg shadow-lg p-6 w-full max-w-md relative">
          <button (click)="close.emit()" class="absolute top-2 right-2 text-gray-400 hover:text-gray-700">&times;</button>
          <h3 class="text-xl font-bold mb-4">Favorites</h3>
          @if (favorites().length) {
            @for (fav of favorites(); track fav.id) {
              <div class="flex items-center gap-2 mb-2">
                <img [src]="fav.image" alt="Fav image" class="w-12 h-12 object-cover rounded" />
                <span class="flex-1">{{ fav.title }}</span>
                <button (click)="remove.emit(fav)" class="text-red-500 hover:underline">Remove</button>
              </div>
            }
          } @else {
            <p class="text-gray-400 text-center">No favorites yet.</p>
          }
        </div>
      </div>
    }
  `
})
export class FavoritesModalComponent {
    @Input({ required: true }) open = signal(false);
    @Input({ required: true }) favorites = signal<any[]>([]);
    @Output() close = new EventEmitter<void>();
    @Output() remove = new EventEmitter<any>();
}

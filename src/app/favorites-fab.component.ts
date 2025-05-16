import { Component, Output, EventEmitter } from '@angular/core';

@Component({
    selector: 'app-favorites-fab',
    template: `
    <button (click)="openModal.emit()" class="fixed bottom-6 right-6 bg-pink-500 text-white rounded-full w-16 h-16 flex items-center justify-center shadow-lg hover:bg-pink-600 z-50">
      <svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor" class="w-8 h-8">
        <path stroke-linecap="round" stroke-linejoin="round" d="M16.5 3.75a5.25 5.25 0 00-4.5 8.19A5.25 5.25 0 1016.5 3.75z" />
      </svg>
    </button>
  `
})
export class FavoritesFabComponent {
    @Output() openModal = new EventEmitter<void>();
}

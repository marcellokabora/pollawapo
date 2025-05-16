import { Component, signal, inject, computed } from '@angular/core';
import { ItemManagerComponent } from './components/item-manager.component';
import { FavoritesIconComponent } from './components/favorites-icon.component';
import { FavoritesModalComponent } from './components/favorites-modal.component';
import { FavoritesService } from './services/favorites.service';

@Component({
  selector: 'app-root',
  imports: [ItemManagerComponent, FavoritesIconComponent, FavoritesModalComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-white shadow p-4 flex items-center justify-between sticky top-0 z-50">
          <img src="/wallapop.png" alt="Wallapop Logo" class="h-10 w-auto" />
        <app-favorites-icon (openModal)="openFavoritesModal()" [favoritesCount]="favorites().length"></app-favorites-icon>
      </header>
      <main class="p-4 max-w-3xl mx-auto">
        <app-item-manager></app-item-manager>
      </main>
      <app-favorites-modal [open]="favoritesModalOpen()" [favorites]="favorites()" (close)="closeFavoritesModal()"></app-favorites-modal>
    </div>
  `
})
export class AppComponent {
  favoritesModalOpen = signal(false);
  public favoritesService = inject(FavoritesService);
  favorites = computed(() => this.favoritesService.favorites());

  openFavoritesModal() {
    this.favoritesModalOpen.set(true);
  }
  closeFavoritesModal() {
    this.favoritesModalOpen.set(false);
  }
}

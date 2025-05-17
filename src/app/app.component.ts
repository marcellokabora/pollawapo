
import { Component } from '@angular/core';
import { ItemListComponent } from './components/item-list.component';
import { FavoritesComponent } from './components/favorites.component';
import { SearchInputComponent } from './components/search-input.component';

@Component({
  selector: 'app-root',
  imports: [FavoritesComponent, SearchInputComponent, ItemListComponent],
  template: `
    <div class="min-h-screen bg-gray-50 flex flex-col">
      <header class="bg-white shadow p-4 sticky top-0 z-50">
        <div class="container max-w-3xl mx-auto flex items-center justify-between w-full">
          <div class="flex items-center min-w-0 flex-shrink-0">
            <div class="overflow-hidden flex items-center justify-start w-10 sm:w-full h-10">
              <img src="/wallapop.png" alt="Wallapop Logo" class="h-10 w-auto block object-left w-10 h-10 object-cover object-left" />
            </div>
          </div>
          <div class="flex-1 flex justify-center px-2">
            <app-search-input></app-search-input>
          </div>
          <app-favorites></app-favorites>
        </div>
      </header>
      <main class="p-4 max-w-3xl mx-auto grow">
        <app-item-list></app-item-list>
      </main>
      <footer class="bg-white shadow p-4 flex items-center justify-center mt-8">
        <img src="/wallapop.png" alt="Wallapop Logo" class="h-10 w-auto" />
      </footer>
    </div>
  `
})
export class AppComponent { }

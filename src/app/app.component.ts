import { Component } from '@angular/core';
import { ItemManagerComponent } from './components/item-manager.component';

@Component({
  selector: 'app-root',
  imports: [ItemManagerComponent],
  template: `
    <div class="min-h-screen bg-gray-50">
      <header class="bg-brand shadow p-4 flex items-center justify-between">
        <h1 class="text-2xl font-bold text-white">Wallapop</h1>
        <!-- Placeholder for future nav or actions -->
         
      </header>
      <main class="p-4 max-w-3xl mx-auto">
        <!-- Item Manager will go here -->
        <app-item-manager></app-item-manager>
      </main>
    </div>
  `
})
export class AppComponent { }

import { Component, OnInit, OnDestroy, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ManagerService } from '../services/manager.service';

import { Subject, Subscription } from 'rxjs';
import { debounceTime } from 'rxjs/operators';

@Component({
  selector: 'app-search-input',
  imports: [FormsModule],
  template: `
    <input
      type="text"
      placeholder="Search..."
      class="px-4 py-2 border-2 border-gray-200 rounded-full w-full sm:min-w-sm focus:border-primary bg-white placeholder-gray-400 text-gray-800 transition-all duration-200 outline-none"
      [(ngModel)]="search"
      (ngModelChange)="onInput($event)"
      autocomplete="off"
    />
  `,
})
export class SearchInputComponent implements OnInit, OnDestroy {
  search = '';
  manager = inject(ManagerService);

  private inputSubject = new Subject<string>();
  private inputSub?: Subscription;

  ngOnInit() {
    this.search = this.manager.searchTerm();
    this.inputSub = this.inputSubject
      .pipe(debounceTime(300)) // Wait for 300ms after the last input
      .subscribe((value) => {
        this.manager.searchTerm.set(value);
        this.manager.page.set(1);
      });
  }

  ngOnDestroy() {
    this.inputSub?.unsubscribe();
  }

  onInput(value: string) {
    this.inputSubject.next(value);
  }
}

import { Component, OnInit, inject } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';

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
export class SearchInputComponent implements OnInit {
    currentSearch = '';
    private route = inject(ActivatedRoute);
    private router = inject(Router);

    ngOnInit() {
        // Initialize input from query params
        this.route.queryParamMap.subscribe(params => {
            this.currentSearch = params.get('search') || '';
        });
    }

    onInput(value: string) {
        this.router.navigate([], {
            relativeTo: this.route,
            queryParams: { search: value || null },
            queryParamsHandling: 'merge',
        });
    }
}

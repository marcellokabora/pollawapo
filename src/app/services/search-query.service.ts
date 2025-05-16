import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({ providedIn: 'root' })
export class SearchQueryService {
    private searchSubject = new BehaviorSubject<string>(this.getSearchFromUrl());
    search$ = this.searchSubject.asObservable();

    constructor() {
        window.addEventListener('popstate', this.handlePopState);
    }

    private handlePopState = () => {
        this.setSearch(this.getSearchFromUrl(), false);
    };

    setSearch(value: string, updateUrl = true) {
        if (updateUrl) {
            const url = new URL(window.location.href);
            if (value) {
                url.searchParams.set('search', value);
            } else {
                url.searchParams.delete('search');
            }
            window.history.replaceState({}, '', url.toString());
        }
        this.searchSubject.next(value);
    }

    getSearchFromUrl(): string {
        const params = new URLSearchParams(window.location.search);
        return params.get('search') || '';
    }
}

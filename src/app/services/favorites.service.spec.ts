import { TestBed } from '@angular/core/testing';
import { FavoritesService } from './favorites.service';
import { Item } from '../interfaces/item.interface';

const mockItem: Item = {
    title: 'Test Item',
    description: 'A test item',
    price: 100,
    email: 'test@example.com',
    image: 'test.png',
};

const anotherItem: Item = {
    title: 'Another Item',
    description: 'Another test item',
    price: 200,
    email: 'another@example.com',
    image: 'another.png',
};

describe('FavoritesService', () => {
    let service: FavoritesService;

    beforeEach(() => {
        TestBed.configureTestingModule({});
        service = TestBed.inject(FavoritesService);
    });

    it('should add an item to favorites', () => {
        service.addToFavorites(mockItem);
        expect(service.favorites().length).toBe(1);
        expect(service.favorites()[0].title).toBe('Test Item');
    });

    it('should not add duplicate items', () => {
        service.addToFavorites(mockItem);
        service.addToFavorites(mockItem);
        expect(service.favorites().length).toBe(1);
    });

    it('should remove an item from favorites', () => {
        service.addToFavorites(mockItem);
        service.removeFromFavorites('Test Item');
        expect(service.favorites().length).toBe(0);
    });

    it('should check if an item is favorite', () => {
        service.addToFavorites(mockItem);
        expect(service.isFavorite('Test Item')).toBe(true);
        expect(service.isFavorite('Nonexistent')).toBe(false);
    });

});

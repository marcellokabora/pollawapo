import { TestBed } from '@angular/core/testing';
import { ManagerService } from './manager.service';
import { ItemService } from './item.service';

describe('ManagerService', () => {
    let manager: ManagerService;
    let itemServiceMock: jest.Mocked<ItemService>;

    beforeEach(() => {
        // Create a mock for ItemService
        itemServiceMock = {
            fetchItemsPage: jest.fn().mockResolvedValue({ items: [], total: 0 })
        } as any;
        TestBed.configureTestingModule({
            providers: [
                ManagerService,
                { provide: ItemService, useValue: itemServiceMock }
            ]
        });
        manager = TestBed.inject(ManagerService);
    });

    afterEach(() => {
        jest.restoreAllMocks();
    });

    it('should initialize with default values', () => {
        expect(manager.page()).toBe(1);
        expect(manager.searchTerm()).toBe('');
        expect(manager.allItems()).toEqual([]);
        expect(manager.totalItems()).toBe(0);
        expect(manager.loading).toBe(false);
        expect(manager.allLoaded).toBe(false);
    });

    it('should load next page if not loading or allLoaded', () => {
        manager.loading = false;
        manager.allLoaded = false;
        manager.page.set(1);
        manager.loadNextPage();
        expect(manager.page()).toBe(2);
    });

    it('should not load next page if loading or allLoaded', () => {
        manager.loading = true;
        manager.page.set(1);
        manager.loadNextPage();
        expect(manager.page()).toBe(1);
        manager.loading = false;
        manager.allLoaded = true;
        manager.loadNextPage();
        expect(manager.page()).toBe(1);
    });

    it('should load 5 items per page and set totalItems', async () => {
        const mockItems = Array.from({ length: 10 }, (_, i) => ({
            title: `Item ${i + 1}`,
            description: `Description ${i + 1}`,
            price: i * 10,
            email: `user${i + 1}@test.com`,
            image: `img${i + 1}.png`
        }));
        // Set up the mock before running the effect
        itemServiceMock.fetchItemsPage.mockResolvedValue({
            items: mockItems.slice(0, 5),
            total: 10
        });

        // Wait for the effect to finish (effect is async)
        await new Promise(res => setTimeout(res, 20));

        expect(manager.allItems().length).toBe(5);
        expect(manager.allItems()).toEqual(mockItems.slice(0, 5));
        expect(manager.totalItems()).toBe(10);
        expect(manager.allLoaded).toBe(false);
    });

    it('should handle fetchItemsPage errors gracefully', async () => {
        itemServiceMock.fetchItemsPage.mockRejectedValue(new Error('Network error'));
        // Wait for the effect to finish
        await new Promise(res => setTimeout(res, 20));
        // Should not be loading, should not be allLoaded, items should be empty
        expect(manager.loading).toBe(false);
        expect(manager.allItems()).toEqual([]);
    });
});

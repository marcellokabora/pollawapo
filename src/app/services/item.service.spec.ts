import { TestBed } from '@angular/core/testing';
import { ItemService } from './item.service';
import { Item } from '../interfaces/item.interface';

const mockItems: Item[] = [
  { title: 'Item 1', description: 'Desc 1', price: 10, email: 'a@a.com', image: 'img1.png' },
  { title: 'Item 2', description: 'Desc 2', price: 20, email: 'b@b.com', image: 'img2.png' },
  { title: 'Special', description: 'Unique', price: 30, email: 'c@c.com', image: 'img3.png' },
];

describe('ItemService', () => {
  let service: ItemService;

  beforeEach(() => {
    TestBed.configureTestingModule({});
    service = TestBed.inject(ItemService);
    // Mock fetch for Jest
    global.fetch = jest.fn().mockResolvedValue({
      ok: true,
      json: () => Promise.resolve(mockItems),
    } as any);
    // Clear cache
    (service as any).itemsCache = null;
    (service as any).itemsPromise = null;
  });

  it('should fetch all items', async () => {
    const items = await service.fetchItems();
    expect(items.length).toBe(3);
    expect(items[0].title).toBe('Item 1');
  });

  it('should cache items after first fetch', async () => {
    await service.fetchItems();
    expect((service as any).itemsCache).toBeTruthy();
  });

  it('should filter by title', async () => {
    const result = await service.fetchItemsPage(1, 10, 'Item 1');
    expect(result.total).toBe(1);
    expect(result.items[0].title).toBe('Item 1');
  });

  it('should filter by description', async () => {
    const result = await service.fetchItemsPage(1, 10, 'Desc 2');
    expect(result.total).toBe(1);
    expect(result.items[0].description).toBe('Desc 2');
  });

  it('should filter by price', async () => {
    const result = await service.fetchItemsPage(1, 10, '20');
    expect(result.total).toBe(1);
    expect(result.items[0].price).toBe(20);
  });

  it('should filter by email', async () => {
    const result = await service.fetchItemsPage(1, 10, 'b@b.com');
    expect(result.total).toBe(1);
    expect(result.items[0].email).toBe('b@b.com');
  });

  it('should return no results for non-matching query', async () => {
    const result = await service.fetchItemsPage(1, 10, 'notfound');
    expect(result.total).toBe(0);
    expect(result.items.length).toBe(0);
  });

  it('should return correct page of items', async () => {
    const { items } = await service.fetchItemsPage(2, 2);
    expect(items.length).toBe(1);
    expect(items[0].title).toBe('Special');
  });

  it('should filter case-insensitively', async () => {
    let result = await service.fetchItemsPage(1, 10, 'item 1');
    expect(result.total).toBe(1);
    expect(result.items[0].title).toBe('Item 1');
    result = await service.fetchItemsPage(1, 10, 'ITEM 2');
    expect(result.total).toBe(1);
    expect(result.items[0].title).toBe('Item 2');
    result = await service.fetchItemsPage(1, 10, 'iTeM');
    expect(result.total).toBe(2);
    expect(result.items[0].title).toContain('Item');
  });

  it('should filter by partial matches', async () => {
    let result = await service.fetchItemsPage(1, 10, 'Spec');
    expect(result.total).toBe(1);
    expect(result.items[0].title).toBe('Special');
    result = await service.fetchItemsPage(1, 10, 'Desc');
    expect(result.total).toBe(2);
    expect(result.items[0].description).toContain('Desc');
  });

  it('should paginate filtered results', async () => {
    let result = await service.fetchItemsPage(1, 1, 'item');
    expect(result.total).toBe(2);
    expect(result.items.length).toBe(1);
    expect(result.items[0].title).toContain('Item');
    result = await service.fetchItemsPage(2, 1, 'item');
    expect(result.total).toBe(2);
    expect(result.items.length).toBe(1);
    expect(result.items[0].title).toContain('Item');
  });

  it('should return all items for empty search query', async () => {
    let result = await service.fetchItemsPage(1, 10, '');
    expect(result.total).toBe(3);
    expect(result.items.length).toBe(3);
  });
});

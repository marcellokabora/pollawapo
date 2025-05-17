import { http, HttpResponse } from 'msw';
import data from './data.json';

export const handlers = [
    http.get('/api/items', async () => {
        await new Promise(res => setTimeout(res, 1000)); // Simulate delay
        return HttpResponse.json(data);
    }),
];
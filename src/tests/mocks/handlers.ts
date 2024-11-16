import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/notes`, () => {
    return HttpResponse.json([
      { id: 1, body: JSON.stringify({ title: 'Test note 1', content: 'Test note 1', updatedAt: '2024-11-13T00:00:00.000Z', type: 'note' }) },
      { id: 2, body: JSON.stringify({ title: 'Test note 2', content: 'Test note 2', updatedAt: '2024-11-13T00:00:00.000Z', type: 'note' }) },
    ]);
  }),
  http.get(`${import.meta.env.VITE_API_URL}/notes/:id`, ({ params }) => {
    if (params.id === '1') {  
      return HttpResponse.json({ id: 1, body: JSON.stringify({ title: 'Test note 1', content: 'Test note 1', updatedAt: '2024-11-13T00:00:00.000Z', type: 'note' }) });
    }
    return HttpResponse.json({ error: 'Note not found' }, { status: 404 });
  }),
];

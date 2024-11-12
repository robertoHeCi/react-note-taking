import { http, HttpResponse } from 'msw';

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/notes`, () => {
    return HttpResponse.json([
      { id: '1', body: 'Test note 1' },
      { id: '2', body: 'Test note 2' },
    ]);
  }),
  http.get(`${import.meta.env.VITE_API_URL}/notes/:id`, ({ params }) => {
    if (params.id === '1') {  
      return HttpResponse.json({ id: '1', body: 'Test note 1' });
    }
    return HttpResponse.json({ error: 'Note not found' }, { status: 404 });
  }),
];

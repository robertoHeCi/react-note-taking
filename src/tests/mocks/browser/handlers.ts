import { http, HttpResponse } from "msw";

const data: Api.Note[] = [
  {
    id: 0,
    body: '{"title":"New note SW 1 ","type":"text","id":0,"updatedAt":"2024-11-15T19:00:40.530Z","content":"aasdsdfasdfa"}'
  },
  {
    id: 1,
    body: '{"title":"New note SW 2","type":"text","id":0,"updatedAt":"2024-11-15T19:00:40.530Z","content":"aasdsdfasdfa"}'
  },
  {
    id: 2,
    body: '{"title":"New note SW 2 ","type":"text","id":0,"updatedAt":"2024-11-15T19:00:40.530Z","content":"aasdsdfasdfa"}'
  },
  {
    id: 3,
    body: '{"title":"New note SW 3 ","type":"todo","id":0,"updatedAt":"2024-11-15T19:00:40.530Z","content":[{"title":"New note SW 3 ","completed":true},{"title":"New note SW 3 ","completed":false}]}'
  }
];

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/notes`, () => {
    return HttpResponse.json(data);
  }),

  // http.get(`${import.meta.env.VITE_API_URL}/notes`, () => {
  //   return HttpResponse.json({ error: "Error fetching notes" }, { status: 500 });
  // }),

  http.get(`${import.meta.env.VITE_API_URL}/notes/:id`, ({ params }) => {
    if (params.id === "1") {
      return HttpResponse.json({ id: "1", body: "Test note 1" });
    }
    return HttpResponse.json({ error: "Note not found" }, { status: 404 });
  }),

  http.post(`${import.meta.env.VITE_API_URL}/notes`, async ({ request }) => {
    const requestBody = await request.json();

    const mockResponse = {
      ...(requestBody as { body: string }),
      id: 4,
    };

    data.push(mockResponse as Api.Note);

    return HttpResponse.json(mockResponse, {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }),
  http.put(`${import.meta.env.VITE_API_URL}/notes/:id`, async ({ request, params }) => {
    const { body } = await request.json() as { body: string };
    const noteId = parseInt(params.id as string); // Convert string param to number if needed

    const noteToUpdate = data.findIndex(note => note.id === noteId);
    if (noteToUpdate !== -1) {
      data[noteToUpdate].body = body;
    }
    return HttpResponse.json({ id: noteId, body });
  })
];

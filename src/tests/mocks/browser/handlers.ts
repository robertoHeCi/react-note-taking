import { http, HttpResponse } from "msw";

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/notes`, () => {
    return HttpResponse.json([
      {
        id: 0,
        body: '{"title":"New note SW 1 ","body":"This is the content","type":"text","id":0,"updatedAt":"2024-11-15T19:00:40.530Z","content":"aasdsdfasdfa"}'
      },
      {
        id: 1,
        body: '{"title":"New note SW 2","body":"This is the content","type":"text","id":0,"updatedAt":"2024-11-15T19:00:40.530Z","content":"aasdsdfasdfa"}'
      },
      {
        id: 2,
        body: '{"title":"New note SW 2 ","body":"This is the content","type":"text","id":0,"updatedAt":"2024-11-15T19:00:40.530Z","content":"aasdsdfasdfa"}'
      }
    ]);
  }),
  http.get(`${import.meta.env.VITE_API_URL}/notes/:id`, ({ params }) => {
    if (params.id === "1") {
      return HttpResponse.json({ id: "1", body: "Test note 1" });
    }
    return HttpResponse.json({ error: "Note not found" }, { status: 404 });
  })
];

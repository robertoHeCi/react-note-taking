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

const users: Api.User[] = [
  {
    "birthdate": 608022796,
    "email": "melany.wijngaard@example.com",
    "first_name": "melany",
    "gender": "female",
    "last_name": "wijngaard",
    "location": {
      "city": "staphorst",
      "postcode": 64265,
      "state": "gelderland",
      "street": "2431 predikherenkerkhof"
    },
    "phone_number": "(727)-033-9347",
    "title": "miss",
    "username": "bigpeacock217"
  },
  {
    "birthdate": 591428535,
    "email": "nanna.pedersen@example.com",
    "first_name": "nanna",
    "gender": "female",
    "last_name": "pedersen",
    "location": {
      "city": "aarhus",
      "postcode": 87547,
      "state": "syddanmark",
      "street": "2177 fåborgvej"
    },
    "phone_number": "43672992",
    "title": "ms",
    "username": "purpleduck599"
  },
  {
    "birthdate": 1132298571,
    "email": "amelia.mercier@example.com",
    "first_name": "amelia",
    "gender": "female",
    "last_name": "mercier",
    "location": {
      "city": "echandens-denges",
      "postcode": 3811,
      "state": "vaud",
      "street": "7454 rue duquesne"
    },
    "phone_number": "(168)-747-5950",
    "title": "madame",
    "username": "whitefrog218"
  },
  {
    "birthdate": 1038915780,
    "email": "sarah.oliver@example.com",
    "first_name": "sarah",
    "gender": "female",
    "last_name": "oliver",
    "location": {
      "city": "manchester",
      "postcode": "I30 5ZF",
      "state": "highlands and islands",
      "street": "3503 manor road"
    },
    "phone_number": "0761-814-654",
    "title": "ms",
    "username": "purplebear893"
  },
  {
    "birthdate": 616226885,
    "email": "özkan.tekelioğlu@example.com",
    "first_name": "özkan",
    "gender": "male",
    "last_name": "tekelioğlu",
    "location": {
      "city": "afyonkarahisar",
      "postcode": 31532,
      "state": "amasya",
      "street": "2260 anafartalar cd"
    },
    "phone_number": "(074)-376-7384",
    "title": "mr",
    "username": "organiccat298"
  },
  {
    "birthdate": 479824115,
    "email": "angela.newman@example.com",
    "first_name": "angela",
    "gender": "female",
    "last_name": "newman",
    "location": {
      "city": "celbridge",
      "postcode": 82776,
      "state": "colorado",
      "street": "3159 west street"
    },
    "phone_number": "081-718-3989",
    "title": "mrs",
    "username": "smallgorilla567"
  },
  {
    "birthdate": 1316736697,
    "email": "buse.dağdaş@example.com",
    "first_name": "buse",
    "gender": "female",
    "last_name": "dağdaş",
    "location": {
      "city": "malatya",
      "postcode": 28227,
      "state": "mardin",
      "street": "6428 anafartalar cd"
    },
    "phone_number": "(855)-841-4810",
    "title": "ms",
    "username": "crazypeacock394"
  },
  {
    "birthdate": 1348121292,
    "email": "judith.schmitz@example.com",
    "first_name": "judith",
    "gender": "female",
    "last_name": "schmitz",
    "location": {
      "city": "mittweida",
      "postcode": 34006,
      "state": "berlin",
      "street": "8227 römerstraße"
    },
    "phone_number": "0171-7824648",
    "title": "miss",
    "username": "smallcat785"
  },
  {
    "birthdate": 1040720948,
    "email": "hector.guerrero@example.com",
    "first_name": "hector",
    "gender": "male",
    "last_name": "guerrero",
    "location": {
      "city": "alcobendas",
      "postcode": 56387,
      "state": "navarra",
      "street": "5140 calle nebrija"
    },
    "phone_number": "696-963-949",
    "title": "mr",
    "username": "lazyleopard999"
  },
  {
    "birthdate": 296641611,
    "email": "carsta.rocha@example.com",
    "first_name": "carsta",
    "gender": "male",
    "last_name": "rocha",
    "location": {
      "city": "arapongas",
      "postcode": 91540,
      "state": "amapá",
      "street": "2609 rua rio de janeiro "
    },
    "phone_number": "(60) 1416-4953",
    "title": "mr",
    "username": "redfish833"
  },
  {
    "birthdate": 513983644,
    "email": "irene.morales@example.com",
    "first_name": "irene",
    "gender": "female",
    "last_name": "morales",
    "location": {
      "city": "lorca",
      "postcode": 40542,
      "state": "castilla y león",
      "street": "4096 calle del arenal"
    },
    "phone_number": "625-790-958",
    "title": "mrs",
    "username": "goldenfish109"
  },
  {
    "birthdate": 1123776172,
    "email": "laly.dasilva@example.com",
    "first_name": "laly",
    "gender": "female",
    "last_name": "da silva",
    "location": {
      "city": "villars-le-terroir",
      "postcode": 9152,
      "state": "ticino",
      "street": "5396 rue duquesne"
    },
    "phone_number": "(082)-419-9335",
    "title": "mademoiselle",
    "username": "bluebird274"
  },
  {
    "birthdate": 929834606,
    "email": "benjamin.patel@example.com",
    "first_name": "benjamin",
    "gender": "male",
    "last_name": "patel",
    "location": {
      "city": "masterton",
      "postcode": 81684,
      "state": "manawatu-wanganui",
      "street": "3675 tennyson street"
    },
    "phone_number": "(788)-424-7144",
    "title": "mr",
    "username": "beautifulbear427"
  },
  {
    "birthdate": 1314124015,
    "email": "noah.poulsen@example.com",
    "first_name": "noah",
    "gender": "male",
    "last_name": "poulsen",
    "location": {
      "city": "nr åby",
      "postcode": 73617,
      "state": "syddanmark",
      "street": "7998 oddenvej"
    },
    "phone_number": "53705244",
    "title": "mr",
    "username": "purplesnake503"
  },
  {
    "birthdate": 567993820,
    "email": "jeffrey.myers@example.com",
    "first_name": "jeffrey",
    "gender": "male",
    "last_name": "myers",
    "location": {
      "city": "tulsa",
      "postcode": 47392,
      "state": "colorado",
      "street": "8239 pockrus page rd"
    },
    "phone_number": "(449)-485-5688",
    "title": "mr",
    "username": "greenswan192"
  }
];

export const handlers = [
  http.get(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_SESSION_ID}/notes`, () => {
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

  http.post(`${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_SESSION_ID}/notes`, async ({ request }) => {
    const requestBody = await request.json();

    const mockResponse = {
      ...(requestBody as { body: string }),
      id: 4
    };

    data.push(mockResponse as Api.Note);

    return HttpResponse.json(mockResponse, {
      status: 201,
      headers: {
        "Content-Type": "application/json"
      }
    });
  }),
  http.put(
    `${import.meta.env.VITE_API_URL}/${import.meta.env.VITE_SESSION_ID}/notes/:id`,
    async ({ request, params }) => {
      const { body } = (await request.json()) as { body: string };
      const noteId = parseInt(params.id as string); // Convert string param to number if needed

      const noteToUpdate = data.findIndex((note) => note.id === noteId);
      if (noteToUpdate !== -1) {
        data[noteToUpdate].body = body;
      }
      return HttpResponse.json({ id: noteId, body });
    }
  ),

  http.get(`${import.meta.env.VITE_API_URL}/users`, () => {
    return HttpResponse.json(users);
  })
];
